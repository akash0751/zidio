const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    github:{
        type: String
    },
    linkedin:{
        type: String
    },
}, { timestamps: true });

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;
