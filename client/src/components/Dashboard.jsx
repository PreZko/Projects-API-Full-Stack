import React, { useState } from 'react'
import Modal from './Modal'
import axios from 'axios'
import Project from './Project'
import ProjectCard from './ProjectCard'

export default function Dashboard(props) {
  const { projects, setProjects, difficultyArr } = props

  // States
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

  // Select a project
  const handleSelectedProject = async (projectId) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}`, {
        withCredentials: true,
      })
      setSelectedProject(response.data.project)
      setShowModal(true)
    } catch (err) {
      setError(err.response?.data?.msg || err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Close the modal
  function handleCloseModal() {
    setShowModal(false)
  }

  // Display message if no projects exist
  if (projects.length === 0) {
    return <p>Add your first project!</p>
  }

  return (
    <>
      {/* Modal for selected project */}
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

      {/* Dashboard header */}
      <div className='section-header'>
        <i className='fa-solid fa-chart-simple pt-6 text-xl'></i>
        <h2>Dashboard</h2>
      </div>

      {/* Grid of project cards */}
      <div className='projects-grid'>
        {projects.map((project, projectId) => (
          <ProjectCard
            key={projectId}
            project={project}
            difficultyArr={difficultyArr}
            onClick={() => handleSelectedProject(project._id)}
          />
        ))}
      </div>

      {/* Loading and error messages */}
      {isLoading && <p className='text-primary'>Loading...</p>}
      {error && <p className='text-red-500'>❌ {error}</p>}
    </>
  )
}
