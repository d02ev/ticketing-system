const JWT = require('jsonwebtoken');
const BcryptJS = require('bcryptjs');
const UserService = require('../services/user.services');

module.exports = class UserController {
    static async register(req, res, next) {
        try {
            if (await UserService.getUserByEmail(req.body.email)) return res.status(400).send('User Already Exists!');

            let role;
            if (req.body.email.includes('admin')) role = 1;

            let passwordSalt = BcryptJS.genSaltSync(10);
            let passwordHash = BcryptJS.hashSync(req.body.password, passwordSalt);
            const newUser = await UserService.createUser({
                fullName: req.body.fullName,
                role: role,
                email: req.body.email,
                passwordHash: passwordHash
            });

            res.status(201).send('User Created Successfully!');
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    static async login(req, res, next) {
        try {
            if (!await UserService.getUserByEmail(req.body.email)) return res.status(404).send('User Does Not Exist!');
            if (!BcryptJS.compareSync(req.body.password, await UserService.getPasswordHashByEmail(req.body.email))) return res.status(401).send('Invalid Credentials!');

            let userId = await UserService.getUserIdByEmail(req.body.email);
            let userRole = await UserService.getRoleByEmail(req.body.email);
            let jwtToken = JWT.sign(
                {
                id: userId,
                role: userRole,
                email: req.body.email
                },
                process.env.JWT_SECRET_KEY
            );

            return res.status(200).json({
                jwtToken: jwtToken
            });
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }


};