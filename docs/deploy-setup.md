# デプロイ設定手順（GitHub Actions + OIDC + AWS）

この文書は、本リポジトリのワークフロー（`.github/workflows/deploy.yml`）で本番デプロイを行うための初期設定手順をまとめたものです。

## 概要
- 認証: GitHub OIDC で AWS IAM ロールを引き受け（AssumeRole）
- フロント: Vite ビルド → S3 へ同期 → CloudFront 無効化
- バック: Composer インストール → Serverless Framework で Lambda(API Gateway) にデプロイ（Bref）
- パラメータ: GitHub リポジトリ変数（vars）で管理

## 事前準備
- AWS アカウント（管理者権限または十分な IAM 権限）
- S3 バケット（静的ホスティング用）
- CloudFront ディストリビューション（S3 をオリジンに設定）
- API Gateway/Lambda デプロイ用の権限（後述の IAM ロールで付与）

## 1) GitHub OIDC 用 IAM ロール作成
1. IAM → ロール作成 → 信頼されたエンティティで「Web アイデンティティ」→ プロバイダ: `token.actions.githubusercontent.com`
2. 条件に以下の信頼ポリシーを設定（対象リポジトリ・ブランチを制限）

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<OWNER>/<REPO>:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

3. 作成したロールの ARN を控える（例: `arn:aws:iam::123456789012:role/GitHubActions-DeployRole`）

## 2) ロールに権限を付与
最小構成の例（必要に応じて絞ってください）。バケット名/CF ID/リージョンは環境に合わせて置き換えます。

- フロント（S3/CloudFront）向けポリシー例:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Sync",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::<S3_BUCKET>",
        "arn:aws:s3:::<S3_BUCKET>/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidate",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "*"
    }
  ]
}
```

- バック（Serverless/Bref）向けポリシー例（ブートストラップ時は広め、後で絞り込み推奨）:
```
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": [
        "cloudformation:*",
        "lambda:*",
        "logs:*",
        "apigateway:*",
        "events:*",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy",
        "iam:PassRole"
      ], "Resource": "*" }
  ]
}
```

注: 厳密な最小権限にする場合は、Serverless が生成するリソースに合わせて `Resource` を限定してください。

## 3) GitHub リポジトリ変数（vars）の設定
- GitHub → Settings → Secrets and variables → Actions → Variables で以下を作成:
  - `AWS_REGION` 例: `ap-northeast-1`
  - `AWS_OIDC_ROLE_ARN` 例: `arn:aws:iam::123456789012:role/GitHubActions-DeployRole`
  - `S3_BUCKET` 例: `my-portfolio-frontend-prod`
  - `CF_DISTRIBUTION_ID` 例: `E123ABC456DEF`

## 4) バックエンドの初期インストール（初回のみ）
```
# 依存導入（ローカル or 任意の環境）。本リポジトリは既に導入済み。
cd backend/laravel
composer install --no-dev --optimize-autoloader
```

## 5) デプロイの流れ
- `main` ブランチに push すると、自動で以下が実行されます:
  - フロント: `yarn build` → `aws s3 sync` → `cloudfront create-invalidation`
  - バック: `composer install` → `serverless deploy --stage prod --region $AWS_REGION`

## 6) 動作確認
- フロント: CloudFront のドメインでサイト表示
- バック: README の「本番 API エンドポイント」を参照（または Serverless の出力）

## 7) トラブルシュート
- OIDC で AssumeRole できない: 信頼ポリシーの `sub` 条件（リポジトリ/ブランチ）が一致しているか確認
- S3 でアクセス拒否: バケット名/リージョンと IAM ポリシーの `Resource` を確認
- Serverless 失敗: IAM 権限不足（`cloudformation`, `lambda`, `apigateway` など）を確認
- CloudFront 反映遅延: Invalidation 後も数分〜十数分かかる場合あり

## 参考
- `.github/workflows/deploy.yml`（本番デプロイワークフロー定義）
- `backend/laravel/serverless.yml`（Bref/Serverless 設定）
- `docs/decisions/2025-11-10-bref-introduction.md`

