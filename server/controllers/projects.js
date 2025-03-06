export const getAllProjects = async (req, res) => {
  res.status(200).send('All projects')
}

export const createProject = async (req, res) => {
  res.status(201).send('Create project')
}

export const getProject = async (req, res) => {
  res.status(200).send('Got project')
}

export const updateProject = async (req, res) => {
  res.status(200).send('Updated project')
}

export const deleteProject = async (req, res) => {
  res.status(200).send('Deleted project')
}
