const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const port = 5080

const knex = require("knex")(require('./knexfile.js')[process.env.NODE_ENV || "development"]);

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/items', (req,res)=>{
  knex('items')
  .then(data=>{
    res.status(200).send(data)
  })
  .catch((err) => {
    console.log(err);
    res.status(301).send('error retreving items')
  })

})

app.get('/users', (req,res)=>{
  knex('users')
  .then(data=>{
    res.status(200).send(data)
  })
  .catch((err) => {
    console.log(err);
    res.status(301).send('error retreving items')
  })

})

app.get('/', (req,res)=>{
  res.status(200).send('working')
})

app.listen(port, ()=>{
  console.log('backend is listening', port)
})
