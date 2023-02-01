const Express = require('express');

const UserRoute = require('./routes/user.routes');
const TicketRoute = require('./routes/ticket.routes');

require('dotenv').config();
require('./config/db.config').connectDB();

const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));

App.use('/api/v1/auth', UserRoute);
App.use('/api/v1/tickets', TicketRoute);

const CONN_PORT = process.env.PORT || 5000;
App.listen(
    CONN_PORT,
    () => console.log(`Server is Listening At http://localhost:${CONN_PORT}`)
);