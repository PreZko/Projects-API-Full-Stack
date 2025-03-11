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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/projects',
          { withCredentials: true }
        )
        setProjects(response.data.projects)
        setLoading(false)
      } catch (err) {
        console.log('Unable to fetch data')
        if (err.response && err.response.data && err.response.data.msg)
          setError(err.response.data.msg)
        else setError('An unexpected error occurred')
        setLoading(false)
      }
    }
    fetchData()
  }, [isAuthenticated])

  useEffect(() => {
    console.log('Updated projects:', projects)
  }, [projects])

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <i className='fa-solid fa-gear animate-spin text-4xl'></i>
      </div>
    )
  }

  if (error && error != 'No token provided') {
    return <div>Error: {error}</div>
  }

  return (
    <Layout>
      {!isAuthenticated && <Introduction />}
      <ProjectForm
        difficultyArr={difficultyArr}
        projects={projects}
        setProjects={setProjects}
      />
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
