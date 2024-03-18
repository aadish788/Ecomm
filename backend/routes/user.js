const ex = require('express');
const { getUsers, getSingleUser, createUser, deleteUser, getAuthToken } = require('../controller/user');
const myrouter = ex.Router();

// Get all users
myrouter.get('/user', getUsers);

// Get a single user by userId
myrouter.get('/user/:userId', getSingleUser);

// Create a new user
myrouter.post('/user', createUser);

// Delete a user by userId
myrouter.delete('/user/:userId', deleteUser);

//auth routes
myrouter.post("/user/login",getAuthToken)


module.exports = myrouter;