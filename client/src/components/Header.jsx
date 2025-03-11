export default function Header({ isAuthenticated, logout, setShowModal }) {
  return (
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
}
