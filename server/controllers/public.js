import Project from '../models/Project.js'

export const getPublicProjects = async (req, res) => {
  const projects = await Project.find({
    userId: '67df08c7d88bc6ca1632d3b6',
  }).sort('-createdAt')
  res.status(200).json({ projects })
}
