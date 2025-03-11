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

  const footer = (
    <footer>
      <p>
        <span className='text-gradient'>ProjectMan</span> was made by{' '}
        <a href='https://www.presiyan-bankov.com' target='_blank'>
          PreZko
        </a>
        <br /> using <a href='https://react.dev/'>React</a> and{' '}
        <a href='https://tailwindcss.com/'>TailwindCSS</a> for the{' '}
        <span className='text-green-400'>Frontend</span>,
        <br />
        <a href='https://nodejs.org/en'>NodeJS</a>,{' '}
        <a href='https://expressjs.com/'>Express</a> and{' '}
        <a href='https://www.mongodb.com/'>MongoDB</a> for the{' '}
        <span className='text-red-400'>Backend</span>
        <br />
        Check out the project on{' '}
        <a
          target='_blank'
          href='https://github.com/PreZko/Projects-API-Full-Stack'
        >
          GitHub
        </a>
        !
      </p>
    </footer>
  )

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
