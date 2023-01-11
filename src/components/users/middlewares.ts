import { Request, Response, NextFunction } from "express";

const usersMiddlewares = {
  createUserCheckData: (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware message:");
    const { email, username, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: `Email missing`,
      });
    } else if (typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: `Email not in string format`,
      });
    } else if (!username) {
      return res.status(400).json({
        success: false,
        message: `Username missing`,
      });
    } else if (typeof username !== "string") {
      return res.status(400).json({
        success: false,
        message: `Username not in number format`,
      });
    } else if (!password) {
      return res.status(400).json({
        success: false,
        message: `Password missing`,
      });
    } else if (typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: `Password not in string format`,
      });
    }
    console.log("Data was most likely entered correctly.");
    next();
  },
};

export default usersMiddlewares;
