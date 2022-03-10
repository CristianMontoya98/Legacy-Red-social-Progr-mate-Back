const { Schema, model } = require('mongoose');

const likeSchema = new Schema({

    like: {
        type: Number,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true })


const Like = model('likes', likeSchema)

module.exports = Like