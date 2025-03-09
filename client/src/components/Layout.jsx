import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from './Modal'
import Authentication from './Authentication'

export default function Layout(props) {
  const { children } = props
  const [showModal, setShowModal] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const header = (
    <header>
      <div>
        <h1 className='text-gradient'>PROJECTMAN API</h1>
        <p>To Track Your Projects</p>
      </div>
      {isAuthenticated ? (
        <button onClick={logout}>
          <p>Logout</p>
        </button>
      ) : (
        <button
          className='flex items-center gap-4'
          onClick={() => {
            setShowModal(true)
          }}
        >
          <p>Sign up Free</p>
          <i className='fa-solid fa-circle-user'></i>
        </button>
      )}
    </header>
  )

  const footer = <footer></footer>

  function handleCloseModal() {
    setShowModal(false)
  }

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  )
}
