import express from 'express'
const router = express.Router()

import { getPublicProjects } from '../controllers/public.js'

router.get('/', getPublicProjects)

export default router
