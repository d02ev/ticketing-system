const TicketModel = require('../models/ticket.model');

module.exports = class TicketService {
    static async createTicket(creationData) {
        try {
            const newTicketCreationData = {
                title: creationData.title,
                description: creationData.description,
                priority: creationData.priority,
                assignedTo: creationData.assignedTo
            };
            const response = await new TicketModel(newTicketCreationData).save();

            return response;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAllTickets() {
        try {
            const tickets = await TicketModel.find({});
            return tickets;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getTicketById(ticketId) {
        try {
            const ticket = await TicketModel.findById(ticketId);
            return ticket;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getTicketsByUserEmail(userEmail) {
        try {
            const tickets = await TicketModel.find({ assignedTo: userEmail });
            return tickets;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAllOpenTickets() {
        try {
            const openTickets = await TicketModel.find({ status: 1 });
            return openTickets;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAllClosedTickets() {
        try {
            const closedTickets = await TicketModel.find({ status: 0 });
            return closedTickets;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async closeTicket(ticketId) {
        try {
            const ticket = await TicketModel.findByIdAndUpdate(ticketId, { status: 0 });
            return ticket;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async deleteTicket(ticketId) {
        try {
            const ticket = await TicketModel.findByIdAndDelete(ticketId);
            return ticket;
        }
        catch (err) {
            console.error(err);
        }
    }
};