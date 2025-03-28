import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from './Modal'
import axios from 'axios'
import Authentication from './Authentication'

export default function ProjectForm(props) {
  const { projects, setProjects, difficultyArr } = props
  const { isAuthenticated } = useAuth()

  // State for form inputs and UI
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

  // Handle form submission
  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true)
      return
    }

    setIsSubmitting(true)
    setError(null)

    if (!projectName) {
      setError('Please provide project name')
      setIsSubmitting(false)
      return
    }

    if (!validateDate(date)) {
      setError('Date must be between 1990-01-01 and 2030-12-31')
      setIsSubmitting(false)
      return
    }

    try {
      const formattedDate = new Date(date) || new Date()
      const res = await axios.post(
        `${API_URL}/projects`,
        {
          title: projectName,
          description,
          difficulty,
          createdAt: formattedDate,
        },
        { withCredentials: true }
      )
      console.log('Created project: ', res.data.project)
      setProjects((prevProjects) => [...prevProjects, res.data.project])
      setProjectName('')
      setDescription('')
    } catch (err) {
      console.log(err.message)
      setError(
        'Error creating project' + (err.response?.data?.msg || error.message)
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Validate date range
  const validateDate = (date) => {
    const minDate = new Date('1990-01-01')
    const maxDate = new Date('2030-12-31')
    const selectedDate = new Date(date)

    return selectedDate >= minDate && selectedDate <= maxDate
  }

  // Close the authentication modal
  function handleCloseModal() {
    setShowModal(false)
  }

  return (
    <>
      {/* Authentication modal */}
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}

      {/* Form header */}
      <div className='section-header'>
        <i className='fa-solid fa-pencil pt-6 text-xl' />
        <h2>
          {!isAuthenticated || (projects || []).length === 0
            ? 'Enter your first project'
            : 'Add another project'}
        </h2>
      </div>

      {/* Project name input */}
      <h4>Choose project name</h4>
      <input
        onChange={(e) => {
          setProjectName(e.target.value)
        }}
        type='text'
        placeholder='Project 1'
        value={projectName}
      />

      {/* Description textarea */}
      <h4>Enter description</h4>
      <textarea
        onChange={(e) => {
          setDescription(e.target.value)
        }}
        value={description}
        placeholder='This project...'
        rows='3'
      ></textarea>

      {/* Difficulty selection */}
      <h4>Select difficulty</h4>
      <div className='diff-grid'>
        {difficultyArr.map((diff, diffIndex) => {
          return (
            <button
              onClick={() => {
                setDifficulty(diffIndex + 1)
              }}
              className={
                'button-card flex justify-between flex-col items-center' +
                (diffIndex + 1 === difficulty ? 'diff-button-selected' : ' ')
              }
              key={diffIndex}
            >
              <h4
                className={
                  'px-2 rounded-lg ' +
                  (diffIndex + 1 === difficulty ? ' ' : ' opacity-70')
                }
                style={{ color: diff.color, background: diff.background }}
              >
                {diffIndex + 1}
              </h4>
              <p>{diff.label}</p>
            </button>
          )
        })}
      </div>

      {/* Date input */}
      <h4>Created at:</h4>
      <input
        onChange={(e) => {
          setDate(e.target.value)
        }}
        type='date'
        min='1990-01-01'
        max='2030-12-31'
        value={date}
      ></input>

      {/* Submit button */}
      <button
        onClick={() => {
          handleSubmitForm()
        }}
        disabled={isSubmitting}
      >
        <p>{isSubmitting ? 'Creating...' : 'Create project'}</p>
      </button>

      {/* Error message */}
      {error && <p className='text-red-500'>❌ {error}</p>}
    </>
  )
}
