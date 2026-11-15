import { useState } from 'react'
import { requestCode } from '../../api/portalAuth.js'
import { toLocalPhone } from '../../auth/phone.js'

export default function PhoneStep({ initialPhone = '', onCodeSent }) {
  const [value, setValue] = useState(initialPhone ? initialPhone.slice(1) : '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const phone = toLocalPhone(value)
    if (!phone) {
      setError('Enter a valid Ghana phone number, like 024 123 4567.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await requestCode(phone)
      onCodeSent(phone)
    } catch (err) {
      setError(err.status === 429 ? 'Too many requests. Wait a few minutes and try again.' : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="sheet__title">Check results</h1>
      <p className="sheet__lead">Enter the phone number the school has for you.</p>

      <label htmlFor="phone" className="field__label">
        Phone number
      </label>
      <div className={`phone-field${error ? ' phone-field--error' : ''}`}>
        <span className="phone-field__prefix" aria-hidden="true">
          +233
        </span>
        <input
          id="phone"
          className="phone-field__input"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="24 123 4567"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            if (error) setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'phone-error' : 'phone-hint'}
          autoFocus
        />
      </div>
      {error ? (
        <p id="phone-error" className="field__error" role="alert">
          {error}
        </p>
      ) : (
        <p id="phone-hint" className="field__hint">
          We&rsquo;ll text you a 6-digit code.
        </p>
      )}

      <button type="submit" className="btn btn--primary sheet__submit" disabled={busy}>
        {busy ? 'Sending…' : 'Send code'}
      </button>
    </form>
  )
}
