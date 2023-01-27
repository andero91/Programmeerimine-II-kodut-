//Kasutajatega seotud endpointid

import pool from "../../database";
import authServices from "../auth/services";
import { IUser, INewUser } from "./interfaces";

const usersServices = {
    findUserById: async (id: number) => {
        const [user] = await pool.query(`SELECT id, username, email, role FROM Users WHERE id=?;`, [id]);
        return user[0];
    },
    findUserByEmail: async (email: string) => {
        const [user] = await pool.query(`SELECT id, email, password, role FROM Users WHERE email=?;`, [email]);
        return user[0];
    },
    getAllUsers: async () => {
        const [users] = await pool.query('SELECT id, username, email, role FROM Users;');
        return users;
    },
    createUser: async (user: INewUser): Promise<number> => {
        const hashedPassword = await authServices.hash(user.password);
        const newUser = {
            email: user.email,
            username: user.username,
            password: hashedPassword,
            role: user.role, //Vaikimisi on uus kasutaja tavakasutaja
        };
        const [result] = await pool.query(`INSERT INTO Users SET ?;`, [newUser]);
        return result.insertId;
    },
    updateUser: async (userToUpdate: IUser): Promise<Boolean> => {
        const { id, email, username, role, password } = userToUpdate;
        const user = await usersServices.findUserById(id);
        let hashedPassword = null;
        if (password) {
            hashedPassword = await authServices.hash(password);
        };
        const update = {
            email: email || user.email,
            username: username || user.username,
            role: role || user.role,
            password: hashedPassword || user.password 
        };
        const result = await pool.query(`UPDATE Users SET ? WHERE ID=?;`, [update, id]);
        console.log(result);
        return true;
    },
    deleteUser: async (id: number): Promise<Boolean> => {
        const result = await pool.query(`DELETE FROM Users WHERE ID=?;`, [id]);
        console.log(result);
        return true;
    }
}

export default usersServices;