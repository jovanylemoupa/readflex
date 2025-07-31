const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', require('./routes/index'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
