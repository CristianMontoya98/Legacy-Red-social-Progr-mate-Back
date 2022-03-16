const { Schema, model } = require('mongoose');

const cohorteSchema = new Schema({

    cohorte: {
        type: Number,
        required: true,
    },
    cohorte_name: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Cohorte = model('cohorte', cohorteSchema)

module.exports = Cohorte