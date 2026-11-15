import { useRef } from 'react'

const LENGTH = 6

// Six single-digit boxes. Typing moves forward, Backspace moves back,
// pasting (or SMS autofill into the first box) fills every box.
export default function CodeInput({ value, onChange, invalid, disabled, describedBy }) {
  const refs = useRef([])
  const digits = Array.from({ length: LENGTH }, (_, i) => value[i] ?? '')

  function focusBox(index) {
    refs.current[Math.max(0, Math.min(LENGTH - 1, index))]?.focus()
  }

  function fillFrom(index, text) {
    const incoming = text.replace(/\D/g, '')
    if (!incoming) return
    const next = (value.slice(0, index) + incoming).slice(0, LENGTH)
    onChange(next)
    focusBox(next.length)
  }

  function handleChange(index, event) {
    const typed = event.target.value.replace(/\D/g, '')
    if (!typed) return
    if (typed.length > 1) {
      fillFrom(index, typed)
      return
    }
    const next = (value.slice(0, index) + typed + value.slice(index + 1)).slice(0, LENGTH)
    onChange(next)
    focusBox(index + 1)
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace') {
      event.preventDefault()
      if (digits[index]) {
        onChange(value.slice(0, index) + value.slice(index + 1))
      } else if (index > 0) {
        onChange(value.slice(0, index - 1) + value.slice(index))
        focusBox(index - 1)
      }
    } else if (event.key === 'ArrowLeft') {
      focusBox(index - 1)
    } else if (event.key === 'ArrowRight') {
      focusBox(index + 1)
    }
  }

  return (
    <div className="code-input" role="group" aria-label="6-digit code" aria-describedby={describedBy}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element
          }}
          className={`code-input__box${invalid ? ' code-input__box--error' : ''}`}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={index === 0 ? LENGTH : 1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={invalid}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => {
            event.preventDefault()
            fillFrom(index, event.clipboardData.getData('text'))
          }}
          onFocus={(event) => event.target.select()}
          autoFocus={index === 0}
        />
      ))}
    </div>
  )
}
