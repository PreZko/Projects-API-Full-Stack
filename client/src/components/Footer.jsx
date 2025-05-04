export default function Footer() {
  return (
    <footer>
      <p>
        <span className='text-gradient'>ProjectMan</span> was made by{' '}
        <a href='https://presiyan.netlify.app' target='_blank'>
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
          href='https://github.com/presiyanbankov/Projects-API-Full-Stack'
        >
          GitHub
        </a>
        !
      </p>
    </footer>
  )
}
