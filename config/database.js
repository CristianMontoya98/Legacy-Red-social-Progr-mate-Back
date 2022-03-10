require('dotenv').config()// allow us to hide our connection secret in the process.env object
const mongoose = require('mongoose')
const { config } = require('./');// establish connection & give yourself a message so you know when its complete

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })
const connection = mongoose.connection
connection.once('open', () => {
  console.log("DB connected.");
})

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
