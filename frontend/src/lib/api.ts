const BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

function apiBase(): string {
  if (!BASE_URL) throw new Error('VITE_API_BASE_URL is not set');
  return BASE_URL.replace(/\/$/, '');
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...init,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message = data?.message ?? res.statusText;
    throw new Error(message);
  }
  return (data?.data ?? data) as T;
}

export type Profile = {
  name: string;
  title: string;
  bio?: string;
  socials?: { type: string; url: string }[];
};

export type Work = {
  id: number;
  title: string;
  description?: string;
  url?: string;
  tags?: string[];
  createdAt?: string;
};

export const api = {
  health: () => request<{ status: string }>(`/health`),
  profile: () => request<Profile>(`/profile`),
  works: () => request<Work[]>(`/works`),
};

