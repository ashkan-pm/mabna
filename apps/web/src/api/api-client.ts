function getApiBaseUrl(): string {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined')
  }

  return apiBaseUrl
}

export async function apiClient<T>(
  pathname: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${pathname}`, init)

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    )
  }

  return response.json() as Promise<T>
}
