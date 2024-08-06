const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const port = 5080


const bcrypt = require('bcrypt');
const knex = require("knex")(require('./knexfile.js')[process.env.NODE_ENV || "development"]);

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/items', (req, res) => {
  knex('items')
    .then(data => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(301).send('error retreving items')
    })

})

app.get('/users', (req, res) => {
  knex('users')
    .then(data => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(301).send('error retreving items')
    })

})

app.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    const hash = await bcrypt.hash(password, 10)
    const newUser = await knex('users')
      .insert({
        first_name,
        last_name,
        username,
        password: hash
      })
    res.status(201).json({ message: 'user created', user: newUser })
  } catch {
    res.status(301).json({ message: 'failed to create user' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { usernameInput, passwordInput } = req.body
    const users = await knex('users').where({ username: usernameInput })
    if (users.length === 0) {
      res.send('username not found')
    }
    const user = users[0];
    const isValid = await bcrypt.compare(passwordInput, user.password)
    if (!isValid) {
      res.send('incorrect password')
      return
    }
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }

})

app.get('/', (req, res) => {
  res.status(200).send('working')
})

app.listen(port, () => {
  console.log('backend is listening', port)
})
