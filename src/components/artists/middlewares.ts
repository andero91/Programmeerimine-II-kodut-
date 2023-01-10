import { Request, Response, NextFunction } from "express";

const artistsMiddlewares = {
    createArtistCheckData: (req: Request, res: Response, next: NextFunction) => {
        console.log('Middleware message:');
        const { name } = req.body;
            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: `Artist name missing`,
                })} else if (typeof name !== "string") {
                return res.status(400).json({
                    success: false,
                    message: `Artist name not in string format`,
                });
            };
        console.log('Data was most likely entered correctly.')
        next();
    }
};

export default artistsMiddlewares;

