import { BadRequestError, NotFoundError } from '../errors/index.js'
import Project from '../models/Project.js'

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({})
  res.status(200).json({ projects, count: projects.length })
}

export const createProject = async (req, res) => {
  const project = await Project.create(req.body)
  res.status(201).json({ project })
}

export const getProject = async (req, res) => {
  const projectId = req.params.id
  const project = await Project.findOne({ _id: projectId })
  if (!project) throw new NotFoundError(`No job with id: ${projectId}`)
  res.status(200).json({ project })
}

export const updateProject = async (req, res) => {
  const {
    body: { title },
    params: { id: projectId },
  } = req
  if (title === '') throw new BadRequestError('Title field cannot be empty')
  const project = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!project) throw new NotFoundError(`No job with id: ${projectId}`)
  res.status(200).json({ project })
}

export const deleteProject = async (req, res) => {
  const projectId = req.params.id
  const project = await Project.findOneAndDelete({ _id: projectId })
  if (!project) throw new NotFoundError(`No job with id: ${projectId}`)
  res.status(200).send()
}
