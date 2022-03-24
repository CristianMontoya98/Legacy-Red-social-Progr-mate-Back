const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({

    idPost: {
        type: Schema.Types.ObjectId,
        ref: "posts",
        require: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    text: {
        type: String,
        require: true
    }
    
}, { timestamps: true })


const Notification = model('notifications', notificationSchema);

module.exports = Notification;