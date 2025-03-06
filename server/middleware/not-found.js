const notFound = (req, res) => {
  console.log('ROUTE DOESNT EXIST')
  res.status(404).send('Route does not exist')
}

export default notFound
