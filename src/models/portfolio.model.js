const { Schema, model } = require('mongoose');

const portfolioSchema = new Schema({

    profile_id: {
        type: String
    },
    
    title: {
        type: String,
        trim: true
      },
    
    image: {
        type: String,
    },    

    description_proyect: {
        type: String
    },

    deploy: {
        type: String,
        trim: true
    },

    proyect_link: {
        type: String,
        trim: true,        
    },

    technologies: {
        type: Array
      },
      
})


const Portfolio = model('portfolio', portfolioSchema)

module.exports = Portfolio
