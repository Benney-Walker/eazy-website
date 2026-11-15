import { useEffect, useRef, useState } from 'react'
import CodeInput from './CodeInput.jsx'
import { requestCode, verifyCode } from '../../api/portalAuth.js'
import { maskPhone } from '../../auth/phone.js'

const RESEND_SECONDS = 60

function verifyErrorMessage(err) {
  if (err.status === 401) return 'That code is wrong or has expired. Check it or request a new one.'
  if (err.status === 429) return 'Too many attempts. Request a new code in a few minutes.'
  return err.message
}

export default function CodeStep({ phone, onChangeNumber, onVerified }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('If this number is registered, a code has been sent.')
  const [busy, setBusy] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const lastSubmitted = useRef('')

  useEffect(() => {
    if (secondsLeft <= 0) return undefined
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  async function submit(candidate) {
    if (candidate.length !== 6) {
      setError('Enter all 6 digits.')
      return
    }
    lastSubmitted.current = candidate
    setBusy(true)
    setError('')
    try {
      const result = await verifyCode(phone, candidate)
      onVerified(result)
    } catch (err) {
      setError(verifyErrorMessage(err))
      setBusy(false)
    }
  }

  function handleCodeChange(next) {
    setCode(next)
    if (error) setError('')
    // Submit as soon as the 6th digit arrives (typed, pasted or autofilled), once per code.
    if (next.length === 6 && next !== lastSubmitted.current && !busy) submit(next)
  }

  async function handleResend() {
    setError('')
    setCode('')
    lastSubmitted.current = ''
    try {
      await requestCode(phone)
      setNotice('A new code is on its way.')
      setSecondsLeft(RESEND_SECONDS)
    } catch (err) {
      setError(err.status === 429 ? 'Too many codes requested. Wait a few minutes and try again.' : err.message)
    }
  }

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        submit(code)
      }}
      noValidate
    >
      <h1 className="sheet__title">Enter your code</h1>
      <p className="sheet__lead">
        Sent to {maskPhone(phone)}.{' '}
        <button type="button" className="link-button" onClick={onChangeNumber}>
          Change number
        </button>
      </p>

      <CodeInput
        value={code}
        onChange={handleCodeChange}
        invalid={Boolean(error)}
        disabled={busy}
        describedBy="code-status"
      />
      <p id="code-status" className={error ? 'field__error' : 'field__hint'} role={error ? 'alert' : 'status'}>
        {error || notice}
      </p>

      <button type="submit" className="btn btn--primary sheet__submit" disabled={busy}>
        {busy ? 'Checking…' : 'Verify'}
      </button>

      <div className="sheet__footer">
        {secondsLeft > 0 ? (
          <p className="field__hint">
            Resend code in {minutes}:{seconds}
          </p>
        ) : (
          <button type="button" className="link-button" onClick={handleResend}>
            Resend code
          </button>
        )}
        <p className="field__hint">Didn&rsquo;t get a code? Check the number or contact your school.</p>
      </div>
    </form>
  )
}
