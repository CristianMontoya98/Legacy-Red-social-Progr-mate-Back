const { Schema, model } = require('mongoose');

const cohorteSchema = new Schema({

    cohorte: {
        type: Number,
        required: true,
    },
    cohorte_name: {
        type: String,
    }
}, { timestamps: true })


const Cohorte = model('cohortes', cohorteSchema)

module.exports = Cohorte