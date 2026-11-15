// Ghana phone helpers. The form shows a fixed "+233" prefix, so guardians may type
// "024 123 4567", "24 123 4567", "+233 24 123 4567" or "233241234567".

// Returns the local 10-digit form "0XXXXXXXXX" (as stored by the backend), or null if invalid.
export function toLocalPhone(input) {
  let digits = String(input).replace(/\D/g, '')
  if (digits.startsWith('233') && digits.length === 12) digits = digits.slice(3)
  if (digits.length === 9) digits = `0${digits}`
  if (digits.length !== 10 || !digits.startsWith('0') || digits[1] === '0') return null
  return digits
}

// "0241234567" → "024 *** **67"
export function maskPhone(localPhone) {
  return `${localPhone.slice(0, 3)} *** **${localPhone.slice(-2)}`
}
