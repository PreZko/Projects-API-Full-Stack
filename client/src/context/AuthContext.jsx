import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used with an AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/auth/verify-token',
        { withCredentials: true }
      )
      console.log('User successfully authenticated')
      setIsAuthenticated(true)
    } catch (error) {
      console.log('unauthorized error')
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        { withCredentials: true }
      )
      await checkAuth()
    } catch (error) {
      console.log('Login failed: ', error)
      throw error
    }
  }

  const register = async (username, email, password) => {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        { username, email, password },
        { withCredentials: true }
      )
      await checkAuth()
    } catch (error) {
      console.log('Registration failed: ', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/auth/logout',
        {},
        { withCredentials: true }
      )
      await checkAuth()
      setUserId(null)
    } catch (error) {
      console.log('Logout failed: ', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
