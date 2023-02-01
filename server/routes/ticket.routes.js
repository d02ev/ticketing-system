const Route = require('express').Router();
const TicketController = require('../controllers/ticket.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

Route.post('/create', AuthMiddleware.ticketAccessAndGenerationAuthMiddleware, TicketController.generateTicket);
Route.get('/', AuthMiddleware.ticketAccessAndGenerationAuthMiddleware, TicketController.accessAllTickets);
Route.get('/open', AuthMiddleware.ticketAccessAndGenerationAuthMiddleware, TicketController.accessAllOpenTickets);
Route.get('/closed', AuthMiddleware.ticketAccessAndGenerationAuthMiddleware, TicketController.accessAllClosedTickets);
Route.patch('/close/:ticketId', AuthMiddleware.ticketClosingAuthMiddleware, TicketController.closeOpenTickets);
Route.delete('/delete/:ticketId', AuthMiddleware.ticketRemovalAuthMiddleware, TicketController.removeTicket);

module.exports = Route;