import { apiRequest } from './client.js'

// Backend §11.3: always 202, whether or not the number is registered.
export function requestCode(phone) {
  return apiRequest('/portal/v1/auth/request-code', { method: 'POST', body: { phone } })
}

// → { token, expiresIn, guardianName, children }. 401 wrong/expired code, 429 too many attempts.
export function verifyCode(phone, code) {
  return apiRequest('/portal/v1/auth/verify-code', { method: 'POST', body: { phone, code } })
}
