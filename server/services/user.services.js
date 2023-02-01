const UserModel = require('../models/user.model');

module.exports = class UserService {
    static async createUser(creationData) {
        try {
            const newUserCreationData = {
                fullName: creationData.fullName,
                role: creationData.role,
                email: creationData.email,
                passwordHash: creationData.passwordHash
            };
            const response = await new UserModel(newUserCreationData).save();

            return response;
        }
        catch(err) {
            console.error(err);
        }
    }

    static async getUserByEmail(userEmail) {
        try {
            const user = await UserModel.findOne({ email: userEmail });
            return user;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getPasswordHashByEmail(userEmail) {
        try {
            const user = await this.getUserByEmail(userEmail);
            const userPasswordHash = user.passwordHash;

            return userPasswordHash;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getRoleByEmail(userEmail) {
        try {
            const user = await this.getUserByEmail(userEmail);
            const userRole = user.role;

            return userRole;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getUserIdByEmail(userEmail) {
        try {
            const user = await this.getUserByEmail(userEmail);
            const userId = user._id;

            return userId;
        }
        catch (err) {
            console.error(err);
        }
    }
};