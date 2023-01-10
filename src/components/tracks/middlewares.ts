import { Request, Response, NextFunction } from "express";

const tracksMiddlewares = {
  createTrackCheckData: (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware message:");
    const { artistID, releaseID, name, } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: `Track name missing`,
      });
    } else if (typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: `Track name not in string format`,
      });
    } else if (!artistID) {
      return res.status(400).json({
        success: false,
        message: `ArtistID missing`,
      });
    } else if (typeof artistID !== "number") {
      return res.status(400).json({
        success: false,
        message: `ArtistID not in number format`,
      });
    } else if (!releaseID) {
      return res.status(400).json({
        success: false,
        message: `ReleaseID missing`,
      });
    } else if (typeof releaseID !== "number") {
      return res.status(400).json({
        success: false,
        message: `ReleaseID not in number format`,
      });
    }
    console.log("Data was most likely entered correctly.");
    next();
  },
};

export default tracksMiddlewares;
