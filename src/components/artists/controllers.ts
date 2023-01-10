import { Request, Response } from "express";
import { IArtist, INewArtist } from "./interfaces";
import artistsServices from "./services";

const artistsControllers = {
    getAllArtists: (req: Request, res: Response) => {
        const allArtists = artistsServices.getAllArtists();
        res.status(200).json({
            success: true,
            message: 'List of artists',
            artists: allArtists,
        });
    },
    getArtistById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let artist: IArtist | undefined = artistsServices.findArtistById(id);

        if (!artist) {
            return res.status(404).json({
                success: false,
                message: `Artist not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Artist`,
            data: {
                artist,
            },
        });
    },
    createArtist: (req: Request, res: Response) => {
        const { name } = req.body;
        /*if (!name) {
            return res.status(400).json({
                success: false,
                message: `Artist name missing`,
            });
        }*/
        
        const newArtist: INewArtist = {
            name
        }
        const id = artistsServices.createArtist(newArtist);
        
        res.status(201).json({
            success: true,
            message: `Artist ${newArtist.name} with id ${id} created`,
        });
    },
    updateArtist: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const artist: IArtist | undefined = artistsServices.findArtistById(id);
        if (!artist) {
            return res.status(404).json({
                success: false,
                message: `Artist not found`,
            });
        }
        if (!name) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const artistToUpdate: IArtist = {
            id,
            name
        }

        artistsServices.updateArtist(artistToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `Artist updated`,
        });
    },
    deleteArtist: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = artistsServices.deleteArtist(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Artist not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Artist deleted`,
        });
    },
};

export default artistsControllers;