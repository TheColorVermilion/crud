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
//FETCH ALL ITEMS
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
//FETCH ITEM BY ID
app.get('/items/:id', (req, res) => {
  try {
    const { id } = req.params;

    knex('items').where({ item_id: id })
      .then(data => {
        res.status(200).send(data)
      })
  } catch (err) {
    console.log(err);
    res.status(301).send('error retreving items')
  }
})
//POST NEW ITEM
app.post('/newitem', async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const { user_id, item_name, description, quantity } = req.body
    if (!user_id || !item_name || !description || quantity === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newItem = await knex('items')
    .insert({
      user_id,
      item_name,
      description,
      quantity
    })
    .returning('*');  // This will return the inserted item
    res.status(201).json({ message: 'Item Added', item: newItem[0] })
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ message: 'Error adding item', error: err.message })
  }
})
//PATCH EXISTING ITEM
app.patch('/edititem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, item_name, description, quantity } = req.body
    const editedItem = await knex('items').where({item_id: id})
    .update({
      user_id,
      item_name,
      description,
      quantity
    })
  res.status(201).json({ message: 'Item updated', item: editedItem })
  } catch (err) {
    console.log(err);
    res.status(301).send('error updating items')
  }
})
//DELETE EXISTING ITEM
app.delete('/deleteitem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await knex('items').where({item_id: id}).del();
    res.status(201).json({ message: 'Item deleted', item: deletedItem })
  } catch (err) {
    console.log(err);
    res.status(301).send('error updating items')
  }


})
//FETCH ALL USERS
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
// FETCH USER BY ID
app.get('/users/:id', (req, res) => {
  try {
    const { id } = req.params;

    knex('items').where({ user_id: id })
      .then(data => {
        res.status(200).send(data)
      })
  } catch (err) {
    console.log(err);
    res.status(301).send('error retreving items')
  }
})

//POST NEW USER
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
//POST LOGIN
app.post('/login', async (req, res) => {
  try {
    const { usernameInput, passwordInput } = req.body
    const users = await knex('users').where({ username: usernameInput })
    if (users.length === 0) {
      return res.status(404).json({ message: 'username not found' })
    }
    const user = users[0];
    const isValid = await bcrypt.compare(passwordInput, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'incorrect password' })

    }
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }

})


app.listen(port, () => {
  console.log('backend is listening', port)
})
