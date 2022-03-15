const { Schema, model } = require('mongoose')

const postSchema = new Schema({

  user_info: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  likes1: [{
    type: Schema.Types.ObjectId,
    ref: 'likes'
  }],
  title: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true,
    lowercase: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  description: {
    type: String
  },
  image: {
    type: String,
  },
  company: {
    type: String
  },
  salary: {
    type: String
  },
  modality: {
    type: String
  },
  contact: {
    type: String
  },
  input_foro: {
    type: String
  },
  link: {
    type: String,
  },
  tags: {
    type: Array,
  },
  dateEvent: {
    type: String
  },
  technologies: {
    type: Array
  },
  place: {
    type: String
  },


}, { timestamps: true })



const Post = model('posts', postSchema)

module.exports = Post;