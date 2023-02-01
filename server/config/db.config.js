const Mongoose = require('mongoose');

exports.connectDB = () => {
    Mongoose.set('strictQuery', true);
    Mongoose.connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to DB Successfully!");
        })
        .catch((err) => {
            console.log("Database Connection Failed! Exiting Now....");
            console.error(err);
            process.exit(1);
        });
};