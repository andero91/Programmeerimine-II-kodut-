import { Request, Response, NextFunction } from "express";

const releasesMiddlewares = {
  createReleaseCheckData: (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware message:");
    const { artistID, recordCompanyID, name, type, releaseDate } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: `Release name missing`,
      });
    } else if (typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: `Release name not in string format`,
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
    } else if (!recordCompanyID) {
      return res.status(400).json({
        success: false,
        message: `RecordCompanyID missing`,
      });
    } else if (typeof recordCompanyID !== "number") {
      return res.status(400).json({
        success: false,
        message: `RecordCompanyID not in number format`,
      });
    } else if (!type) {
      return res.status(400).json({
        success: false,
        message: `Release type missing`,
      });
    } else if (typeof type !== "string") {
      return res.status(400).json({
        success: false,
        message: `Release type not in string format`,
      });
    } else if (!releaseDate) {
      return res.status(400).json({
        success: false,
        message: `ReleaseDate missing`,
      });
    } else if (releaseDate!! instanceof Date) {
      return res.status(400).json({
        success: false,
        message: `ReleaseDate not in Date format`,
      });
    }
    console.log("Data was most likely entered correctly.");
    next();
  },
};

export default releasesMiddlewares;
