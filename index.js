const express = require('express');// establish an express app
const app = express();// establish an express app
const cors = require('cors'); // allow requests from outside resources like postman, or your frontend if you choose to build that out
const morgan = require('morgan');
const { logError, errorHandler, wrapError } = require('./utils/middleware/errorHandlers');
const userRoutes = require('./src/controllers/user.controller')
const { profilesApi, usersApi, postsApi, commentApi, likeApi, portfolioApi } = require('./src/controllers');
const userLogin = require("./src/routes/user.route")
// Conection MongoDB
require('./config/database')

//Middleware
app.use(cors());

app.use(express.json());// app will serve and receive data in a JSON format
app.use(morgan('dev'));


//error middleware
app.use(logError);
app.use(wrapError);
app.use(errorHandler);

// routes
app.use('/api/users', usersApi)
app.use('/api/profiles', profilesApi)
app.use('/api/posts', postsApi)
app.use('/api/comments', commentApi)
app.use('/api/likes', likeApi)
app.use('/api/portfolios', portfolioApi)
app.use('/api', userLogin)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Successfully served on port: ${PORT}.`);
})