import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Authentication(props) {
  const { handleCloseModal } = props

  // State for form inputs and UI
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  // Access authentication functions from context
  const { login, register } = useAuth()

  async function handleAuthenticate() {
    try {
      setIsAuthenticating(true)
      setError(null)
      if (isRegistering) {
        await register(username, email, password)
      } else {
        await login(email, password)
      }
      handleCloseModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <>
      <h2>{isRegistering ? 'Sign up' : 'Log in'}</h2>
      <p>{isRegistering ? 'Create an account' : 'Sign in to your account'}</p>
      {/* Display error message if any */}
      {error && <p>❌ {error}</p>}

      {/* Username input for registration */}
      {isRegistering && (
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          placeholder='Username'
        ></input>
      )}

      {/* Email input */}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        placeholder='Email'
      ></input>

      {/* Password input */}
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        type='password'
        placeholder='********'
      ></input>

      {/* Submit button */}
      <button onClick={handleAuthenticate} disabled={isAuthenticating}>
        <p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p>
      </button>

      <hr />

      {/* Toggle between login and sign-up */}
      <div className='register-content'>
        <p className='pb-2'>
          {isRegistering
            ? 'Already have an account?'
            : "Haven't made an account yet?"}
        </p>
        <button
          onClick={() => {
            setIsRegistering(!isRegistering)
          }}
        >
          {isRegistering ? 'Log in' : 'Sign up'}
        </button>
      </div>
    </>
  )
}
