const { Schema, model } = require('mongoose')

const commentAlumniSchema = new Schema({

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  comment: {
    type: String,
    require: true
  }

}, { timestamps: true })

const Comment = model('comments', commentAlumniSchema)

module.exports = Comment