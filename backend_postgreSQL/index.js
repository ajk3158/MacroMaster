const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001

const foods_model = require('./foods_model')

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});

app.get('/', (req, res) => {
  foods_model.getFoods()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/foods', (req, res) => {
  foods_model.createFoods(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/foods/:food_name', (req, res) => {
  foods_model.deleteFoods(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})