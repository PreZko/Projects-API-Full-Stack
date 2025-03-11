export default function ProjectCard({ project, difficultyArr, onClick }) {
  return (
    <button onClick={onClick} className='project-button relative'>
      <h4 className='bg-secondary rounded-md top-0 truncate py-3 px-4 '>
        {project.title}
      </h4>
      <div className='project-info text-left'>
        <p className='truncate w-full '>
          {'Description: ' + (project.description || 'none')}
        </p>
        <p
          className={'px-2 rounded-lg '}
          style={{
            color: difficultyArr[project.difficulty - 1].color,
            background: difficultyArr[project.difficulty - 1].background,
          }}
        >
          {difficultyArr[project.difficulty - 1].label}
        </p>
        <p>
          {new Date(project.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </button>
  )
}
