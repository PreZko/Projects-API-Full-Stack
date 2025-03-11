import React, { useState } from 'react'
import axios from 'axios'

export default function Project(props) {
  const {
    selectedProject: {
      _id: projectId,
      title,
      description,
      difficulty,
      createdAt,
    },
    difficultyArr,
    handleCloseModal,
    projects,
    setProjects,
  } = props
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [newDifficulty, setNewDifficulty] = useState(difficulty)
  const [newDate, setNewDate] = useState(createdAt)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const saveNewData = async () => {
    setIsLoading('Saving...')
    setError(null)

    if (!newTitle) {
      setError('Please provide project name')
      setIsLoading(false)
      return
    }

    if (!validateDate(newDate)) {
      setError('Date must be between 1990-01-01 and 2030-12-31')
      setIsLoading(false)
      return
    }
    try {
      console.log(newDate)
      const formattedDate = new Date(newDate) || new Date()
      console.log(formattedDate)
      await axios.patch(
        `http://localhost:3000/api/v1/projects/${projectId}`,
        {
          title: newTitle,
          description: newDescription,
          difficulty: newDifficulty,
          createdAt: formattedDate,
        },
        {
          withCredentials: true,
        }
      )
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                title: newTitle,
                description: newDescription,
                difficulty: newDifficulty,
                createdAt: formattedDate,
              }
            : project
        )
      )
      handleCloseModal()
    } catch (err) {
      setError(err.response?.data?.msg || err.message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  const deleteData = async () => {
    setIsLoading('Deleting...')
    setError(null)

    try {
      await axios.delete(`http://localhost:3000/api/v1/projects/${projectId}`, {
        withCredentials: true,
      })

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      )
      handleCloseModal()
    } catch (err) {
      setError(err.response?.data?.msg || err.message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const validateDate = (date) => {
    const minDate = new Date('1990-01-01')
    const maxDate = new Date('2030-12-31')
    const selectedDate = new Date(date)

    return selectedDate >= minDate && selectedDate <= maxDate
  }

  return (
    <>
      <h2>Edit your project</h2>
      {error && <p className='text-red-500'>{error}</p>}
      <input
        placeholder='Project Name'
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
      />
      <textarea
        placeholder='Description'
        onChange={(e) => setNewDescription(e.target.value)}
        rows='3'
        value={newDescription}
      />
      <select
        style={{
          color: difficultyArr[newDifficulty - 1].color,
          background: difficultyArr[newDifficulty - 1].background,
        }}
        onChange={(e) => setNewDifficulty(e.target.value)}
        defaultValue={newDifficulty}
      >
        {difficultyArr.map((diff, diffIndex) => {
          return (
            <option
              style={{
                color: diff.color,
                background: diff.background,
              }}
              value={diffIndex + 1}
              key={diffIndex}
            >
              {diffIndex + 1} - {diff.label}
            </option>
          )
        })}
      </select>
      <input
        onChange={(e) => setNewDate(e.target.value)}
        type='date'
        min='1990-01-01'
        max='2030-12-31'
        value={new Date(newDate).toISOString().split('T')[0]}
      ></input>

      <div className='action-buttons'>
        <button
          onClick={() => saveNewData()}
          className='bg-green-700 text-green-300 border-green-500 shadow-green-500'
        >
          {isLoading || 'SAVE'}
        </button>
        <button
          onClick={() => deleteData()}
          className='bg-red-700 text-red-300 border-red-500 shadow-red-500'
        >
          {isLoading || 'DELETE'}
        </button>
      </div>
    </>
  )
}
