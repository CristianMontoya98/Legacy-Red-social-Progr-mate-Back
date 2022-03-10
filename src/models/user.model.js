const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 45
    },
    middleName: {
        type: String,
        maxlength: 45
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 45
    },
    secondSurname: {
        type: String,
        maxlength: 45
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        lowercase: true,
    },
    contactNumber: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    rol: {
        type: Number,
        default: 0
    },

    program: {
        type: String,
        default: "Programate"
    },

    cohorte: {
        num: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        }

    },
    state: {
        type: Boolean,
        default: true
    },

    passwordHash: {
        type: String,
        require: true

    },
}, { timestamps: true })


const User = model('users', userSchema)

module.exports = User