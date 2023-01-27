import { Request, Response } from "express";
import { IUser, INewUser } from "./interfaces";
import usersServices from "./services";

const usersControllers = {
    getAllUsers: async (req: Request, res: Response) => {
        const allUsers = await usersServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'List of users',
            users: allUsers,
        });
    },
    getUserById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user = await usersServices.findUserById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `User`,
            data: {
                user,
            },
        });
    },
    createUser: async (req: Request, res: Response) => {
        const { email, username, password } = req.body;
        
        const newUser: INewUser = {
            email, username, password, role: 'User'
        }
        const id = await usersServices.createUser(newUser);
        
        res.status(201).json({
            success: true,
            message: `User ${newUser.username} with id ${id} created`,
        });
    },
    updateUser: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { email, username, password, role } = req.body;
        const user = await usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        if (!email && !username && !password) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const userToUpdate: IUser = {
            id,
            email,
            username,
            password,
            role
        }

        usersServices.updateUser(userToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `User updated`,
        });
    },
    deleteUser: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = await usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }

        return res.status(200).json({
            success: true,
            message: `User deleted`,
        });
    },
};

export default usersControllers;