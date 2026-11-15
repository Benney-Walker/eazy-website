// Thin fetch wrapper for the EazyManage backend.
// Base URL: VITE_API_BASE_URL (e.g. http://localhost:8080/api in .env.local), else production.
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://schoolmanagement.api.bynexlabs.com/api').replace(
  /\/+$/,
  '',
)

export class ApiError extends Error {
  // status 0 means the request never reached the server (offline, DNS, CORS).
  constructor(status, message, reasonCode = null) {
    super(message)
    this.status = status
    this.reasonCode = reasonCode
  }
}

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, "Can't reach the server. Check your connection and try again.")
  }

  const text = await response.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, data?.message || data?.error || 'Something went wrong. Try again.', data?.reasonCode)
  }
  return data
}
