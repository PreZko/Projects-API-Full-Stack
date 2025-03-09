import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import { useAuth } from './context/AuthContext'
import Introduction from './components/Introduction'

function App() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) {
    return (
      <div>
        <i className='fa-solid fa-gear'></i>
      </div>
    )
  }

  return <Layout>{isAuthenticated ? <Dashboard /> : <Introduction />}</Layout>
}

export default App
