const { response } = require('express');
const JWT = require('jsonwebtoken');
const TicketService = require('../services/ticket.services');

module.exports = class TicketController {
    static async generateTicket(req, res, next) {
        try {
            let priority;
            if (req.body.priority === 'high') priority = 1;
            if (req.body.priority === 'medium') priority = 0;
            if (req.body.priority === 'low') priority = -1;

            const newTicket = await TicketService.createTicket({
                title: req.body.title,
                description: req.body.description,
                priority: priority,
                assignedTo: req.body.assignedTo
            });

            return res.status(201).json({
                message: 'Ticket Created Successfully!',
                ticketId: newTicket._id
            });
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async accessAllTickets(req, res, next) {
        try {
            const tickets = await TicketService.getAllTickets();
            return res.status(200).json(tickets);
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async accessAllOpenTickets(req, res, next) {
        try {
            const openTickets = await TicketService.getAllOpenTickets();

            if (!openTickets) {
                return res.status(404).send('No Open Tickets Found!');
            }

            return res.status(200).json(openTickets);
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async accessAllClosedTickets(req, res, next) {
        try {
            const closedTickets = await TicketService.getAllClosedTickets();

            if (!closedTickets) {
                return res.status(404).send('No Closed Tickets Found!');
            }

            return res.status(200).json(closedTickets);
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async closeOpenTickets(req, res, next) {
        try {
            const ticket = await TicketService.getTicketById(req.params.ticketId);

            if (ticket.status === 0) {
                return res.status(409).send('Cannot Perform The Action. Ticket Is Already Closed!');
            }

            const assignedTo = ticket.assignedTo;
            const priority = ticket.priority;
            const tickets = await TicketService.getTicketsByUserEmail(assignedTo);
            let priorityCounter = 0;

            tickets.forEach(ticket => {
                if (((priority === -1 && (ticket.priority === 0 || ticket.priority === 1)) || (priority === 0 && ticket.priority === 1)) && ticket.status === 1) {
                    ++priorityCounter;
                }
            });

            if (priorityCounter > 0) {
                return res.status(409).send('High Priority Tickets Need To Be Closed First!');
            }

            await TicketService.closeTicket(req.params.ticketId);
            return res.status(200).send('Ticket Has Been Successfully Closed!');
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async removeTicket(req, res, next) {
        try {
            await TicketService.deleteTicket(req.params.ticketId);
            return res.status(200).send('Ticket Has Been Successfully Closed!');
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }
};