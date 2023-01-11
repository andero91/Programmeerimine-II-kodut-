//Kasutajatega seotud endpointid

import { users } from "../../mockData";
import authServices from "../auth/services";
import { IUser, INewUser } from "./interfaces";

const usersServices = {
    findUserById: (id: number): IUser | undefined => {
        let user: IUser | undefined = users.find(element => {return element.id === id})
        return user;
    },
    findUserByEmail: (email: string): IUser | undefined => {
        let user: IUser | undefined = users.find(element => {return element.email === email})
        return user;
    },
    getAllUsers: () => {
        return users;
    },
    createUser: async (user: INewUser): Promise<number> => {
        const id = users.length + 1;
        const hashedPassword = await authServices.hash(user.password);
        const newUser: IUser = {
            id,
            email: user.email,
            username: user.username,
            password: hashedPassword,
            role: user.role, //Vaikimisi on uus kasutaja tavakasutaja
        };
        users.push(newUser);
        return id;
    },
    updateUser: async (userToUpdate: IUser): Promise<Boolean> => {
        const { id, email, username, password, role } = userToUpdate;
        const user = usersServices.findUserById(id);
        if (user && email ) user.email = email;
        if (user && username ) user.username = username;
        if (user && password) {
            const hashedPassword = await authServices.hash(userToUpdate.password);
            user.password = hashedPassword;
        } 
        if (user && role) user.role = role;

        return true;
    },
    deleteUser: (id: number): Boolean => {
        const index = users.findIndex(element => element.id === id);
        if (index === -1) return false;
        users.splice(index, 1);
        return true;
    }
}

export default usersServices;