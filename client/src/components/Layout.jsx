import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from './Modal'
import Authentication from './Authentication'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props) {
  const { children } = props
  const [showModal, setShowModal] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  function handleCloseModal() {
    setShowModal(false)
  }

  return (
    <>
      {/* Modal for authentication */}
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}

      {/*Header, Main, Footer structure*/}
      <Header
        isAuthenticated={isAuthenticated}
        logout={logout}
        setShowModal={setShowModal}
      />

      <main>{children}</main>

      <Footer />
    </>
  )
}
