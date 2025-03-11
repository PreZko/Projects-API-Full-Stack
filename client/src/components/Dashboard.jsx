import React, { useState } from 'react'
import Modal from './Modal'
import axios from 'axios'
import Project from './Project'

export default function Dashboard(props) {
  const { projects, setProjects, difficultyArr } = props

  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSelectedProject = async (projectId) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/projects/${projectId}`,
        { withCredentials: true }
      )
      setSelectedProject(response.data.project)
      setShowModal(true)
    } catch (err) {
      setError(err.response?.data?.msg || err.message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCloseModal() {
    setShowModal(false)
  }
  if (projects.length === 0) {
    return <p>Add your first project!</p>
  }
  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Project
            selectedProject={selectedProject}
            projects={projects}
            setProjects={setProjects}
            difficultyArr={difficultyArr}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      <div className='section-header'>
        <i className='fa-solid fa-chart-simple pt-6 text-xl'></i>
        <h2>Dashboard</h2>
      </div>
      <div className='projects-grid'>
        {projects.map((project, projectId) => {
          return (
            <button
              onClick={() => {
                handleSelectedProject(project._id)
              }}
              key={projectId}
              className='project-button relative'
            >
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
                    background:
                      difficultyArr[project.difficulty - 1].background,
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
        })}
      </div>
      {isLoading && <p className='text-primary'>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </>
  )
}
