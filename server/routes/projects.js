import express from 'express'
const router = express.Router()

import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.js'

router.route('/').get(getAllProjects).post(createProject)
router.route(':id').get(getProject).patch(updateProject).delete(deleteProject)

export default router
