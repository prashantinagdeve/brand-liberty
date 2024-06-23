const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    domain :{
        type : String
    },
    category :{
        type : String
    },
    subcategory :{
        type : String
    },
    prompt : {
        type : String
    },
    specialCode: {
        type: String,
        unique: true,
        required: true
    }

})

module.exports = mongoose.model ('Project', ProjectSchema)