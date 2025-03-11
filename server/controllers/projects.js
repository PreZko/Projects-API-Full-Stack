import { NotFoundError } from '../errors/index.js'
import Project from '../models/Project.js'

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user.userId }).sort(
    '-createdAt'
  )
  res.status(200).json({ projects, count: projects.length })
}

export const createProject = async (req, res) => {
  req.body.userId = req.user.userId
  const project = await Project.create(req.body)
  res.status(201).json({ project })
}

export const getProject = async (req, res) => {
  const {
    user: { userId },
    params: { id: projectId },
  } = req
  const project = await Project.findOne({ _id: projectId, userId })
  if (!project) throw new NotFoundError(`No job with id: ${projectId}`)
  res.status(200).json({ project })
}

export const updateProject = async (req, res) => {
  const {
    user: { userId },
    params: { id: projectId },
  } = req

  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!project) throw new NotFoundError(`No job with id: ${projectId}`)
  res.status(200).json({ project })
}

export const deleteProject = async (req, res) => {
  const {
    user: { userId },
    params: { id: projectId },
  } = req
  const project = await Project.findOneAndDelete({ _id: projectId, userId })
  if (!project) throw new NotFoundError(`No job with id: ${projectId}`)
  res.status(200).send()
}
