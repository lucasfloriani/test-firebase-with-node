require('dotenv').config()
var db = require('./src/database')
var userController = require('./src/controller/users')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.get('/', userController.getUsers(db))
app.get('/:id', userController.getUser(db))
app.post('/:id', userController.createUser(db))
app.put('/:id', userController.updateUser(db))
app.delete('/:id', userController.deleteUser(db))

// Init Server
app.listen(3000, () => console.log('Example app listening on port 3000!'))

// app.get('/', (req, res) => res.status().json())