const Mongoose = require('mongoose');

const ticketSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    priority: {
        type: Number,
        required: true,
        default: -1
    },
    assignedTo: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'tickets'
});

module.exports = Mongoose.model('TicketModel', ticketSchema);