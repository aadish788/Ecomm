const mongoose = require('mongoose');

const User = mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }

});

module.exports = mongoose.model('user', User);
