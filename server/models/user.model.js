const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String
    }
}, {
    collection: 'users'
});

module.exports = Mongoose.model('UserModel', userSchema);