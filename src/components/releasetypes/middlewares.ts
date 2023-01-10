import { Request, Response, NextFunction } from "express";

const releaseTypesMiddlewares = {
  createReleaseTypeCheckData: (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware message:");
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: `Release type name missing`,
      });
    } else if (typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: `Release type name not in string format`,
      });
    }
    console.log("Data was most likely entered correctly.");
    next();
  },
};

export default releaseTypesMiddlewares;
