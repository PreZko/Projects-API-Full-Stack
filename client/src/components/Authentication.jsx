import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Authentication(props) {
  const { handleCloseModal } = props

  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState(null)

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
      console.log(err)
      if (err.response && err.response.data && err.response.data.msg) {
        console.log(err.response.data.msg)
        setError(err.response.data.msg)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <>
      <h2>{isRegistering ? 'Sign up' : 'Log in'}</h2>
      <p>{isRegistering ? 'Create an account' : 'Sign in to your account'}</p>
      {error && <p>❌ {error}</p>}
      {isRegistering && (
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          placeholder='Username'
        ></input>
      )}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        placeholder='Email'
      ></input>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        type='password'
        placeholder='********'
      ></input>
      <button onClick={handleAuthenticate}>
        <p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p>
      </button>
      <hr></hr>
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
