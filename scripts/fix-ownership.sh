#!/usr/bin/env bash
set -euo pipefail

# Normalize repository file ownership to the current host user.
# Usage: bash scripts/fix-ownership.sh [target-dir...]
# If no args, defaults to project root.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGETS=("${@:-$ROOT_DIR}")

UID_GID="$(id -u):$(id -g)"

echo "[fix-ownership] Changing ownership to ${UID_GID}"
for t in "${TARGETS[@]}"; do
  # Safety: ensure target is inside repo
  REAL_T="$(realpath "$t")"
  case "$REAL_T" in
    ${ROOT_DIR}*) ;;
    *) echo "[skip] $t is outside repository. Skipped."; continue ;;
  esac
  echo "[chown] $REAL_T"
  sudo chown -R "${UID_GID}" "$REAL_T"
done

echo "[done]"

