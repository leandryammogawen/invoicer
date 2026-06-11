const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `Request failed with status ${response.status}`,
    );
  }

  return response;
}
