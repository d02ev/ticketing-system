const JWT = require('jsonwebtoken');
const TicketService = require('../services/ticket.services');

function verifyToken(req, res, next) {
    let authToken = req.headers.authorization;

    if (!authToken) return res.status(403).send('No Auth Token Found!');

    try {
        authToken = authToken.slice(7);
        const decodedToken = JWT.verify(authToken, process.env.JWT_SECRET_KEY);

        req.user = decodedToken;
    }
    catch (err) {
        return res.status(401).send('Not Authorised!');
    }

    return next();
}

module.exports = class AuthMiddleware {
    static async ticketAccessAndGenerationAuthMiddleware(req, res, next) {
        await verifyToken(req, res, () => {
            if (req.user.role === 1) next();
            else res.status(403).send('You Are Not Authorised For The Action!');
        });
    }

    static async ticketRemovalAuthMiddleware(req, res, next) {
        await verifyToken(req, res, () => {
            if (req.user.role === 1) next();
            else res.status(403).send('You Are Not Authorised For The Action!');
        });
    }

    static async ticketClosingAuthMiddleware(req, res, next) {
        const ticket = await TicketService.getTicketById(req.params.ticketId);
        const assignedTo = ticket.assignedTo;

        await verifyToken(req, res, () => {
            if (req.user.role == 1 || (req.user.email === assignedTo)) next();
            else res.status(403).send('You Are Not Authorised For The Actions!');
        });
    }
};