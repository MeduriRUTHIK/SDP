import userModel from "../models/user.model";
import { Response } from 'express'
import { redis } from "../utils/redis";

// get user by id
export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            user,
        });
    }
};

// Get all users
export const getAllUsersService = async (res: Response) => {
    const users = await userModel.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        users,
    });
};

//update user role
export const updateUserRoleService = async (email: String, role: String, res: Response) => {
    const user = await userModel.findOneAndUpdate({ email }, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, user });
}