import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import { useAuth } from './context/AuthContext'
import Introduction from './components/Introduction'
import ProjectForm from './components/ProjectForm'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const { isAuthenticated } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

  // Difficulty levels with associated colors for UI
  const difficultyArr = [
    {
      label: 'Super Easy',
      color: '#065f46',
      background: '#d1fae5',
    },
    {
      label: 'Easy',
      color: '#15803d',
      background: '#bbf7d0',
    },
    {
      label: 'Medium',
      color: '#ca8a04',
      background: '#fef08a',
    },
    {
      label: 'Hard',
      color: '#b45309',
      background: '#fed7aa',
    },
    {
      label: 'Super Hard',
      color: '#dc2626',
      background: '#fecaca',
    },
  ]

  // Fetch projects data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`, {
          withCredentials: true,
        })
        setProjects(response.data.projects)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.msg || 'An unexpected error occurred')
        setLoading(false)
      }
    }
    fetchData()
  }, [isAuthenticated]) // Re-fetch data when authentication status changes

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <i className='fa-solid fa-gear animate-spin text-4xl'></i>
      </div>
    )
  }

  // Show error message if data fetching fails
  if (error && error != 'No token provided') {
    return <div>Error: {error}</div>
  }

  return (
    <Layout>
      {/* Show introduction for unauthenticated users */}
      {!isAuthenticated && <Introduction />}

      {/* Project form for adding new projects */}
      <ProjectForm
        difficultyArr={difficultyArr}
        projects={projects}
        setProjects={setProjects}
      />

      {/* Show dashboard for authenticated users */}
      {isAuthenticated && (
        <Dashboard
          difficultyArr={difficultyArr}
          projects={projects}
          setProjects={setProjects}
        />
      )}
    </Layout>
  )
}

export default App
