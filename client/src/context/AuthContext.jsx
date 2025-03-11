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
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

  // Check authentication status by verifying the token
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify-token`, {
        withCredentials: true,
      })
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
    }
  }

  // Verify authentication on component mount
  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      await checkAuth()
    } catch (error) {
      throw new Error(
        error.response?.data?.msg || 'Login failed. Please try again.'
      )
    }
  }

  const register = async (username, email, password) => {
    try {
      await axios.post(
        `${API_URL}/auth/register`,
        { username, email, password },
        { withCredentials: true }
      )
      await checkAuth()
    } catch (error) {
      throw new Error(
        error.response?.data?.msg || 'Login failed. Please try again.'
      )
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      await checkAuth()
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
