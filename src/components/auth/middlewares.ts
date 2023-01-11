import { Request, Response, NextFunction } from "express";
import authServices from "./services";

const authMiddleware = {
  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; //Küsimärk, sest võib-olla seda ei ole seal ja sel juhul ei tehta spliti
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found',
        });
    }
    try {
        const decoded = await authServices.verify(token);
        res.locals.user = decoded; //Kirje sisaldab infot kasutaja kohta
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token is not valid',
        });
    }
    return next();
  },
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role == 'User') {
        return res.status(401).json({
            success: false,
            message: 'User role is not admin',
        });
    }
    return next();
  },
};

export default authMiddleware;