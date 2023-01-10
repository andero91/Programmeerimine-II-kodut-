import { Request, Response } from "express";
import { ITrack, INewTrack } from "./interfaces";
import tracksServices from "./services";

const tracksControllers = {
    getAllTracks: (req: Request, res: Response) => {
        const allTracks = tracksServices.getAllTracks();
        res.status(200).json({
            success: true,
            message: 'List of tracks',
            tracks: allTracks,
        });
    },
    getTrackById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let track: ITrack | undefined = tracksServices.findTrackById(id);

        if (!track) {
            return res.status(404).json({
                success: false,
                message: `Track not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Track`,
            data: {
                track,
            },
        });
    },
    createTrack: (req: Request, res: Response) => {
        const { artistID, releaseID, name } = req.body;
        
        const newTrack: INewTrack = {
            artistID, releaseID, name
        }
        const id = tracksServices.createTrack(newTrack);
        
        res.status(201).json({
            success: true,
            message: `Track ${newTrack.name} with id ${id} created`,
        });
    },
    updateTrack: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { artistID, releaseID, name } = req.body;
        const track: ITrack | undefined = tracksServices.findTrackById(id);
        if (!track) {
            return res.status(404).json({
                success: false,
                message: `Track not found`,
            });
        }
        if (!artistID && !releaseID && !name) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const trackToUpdate: ITrack = {
            id,
            artistID,
            releaseID,
            name
        }

        tracksServices.updateTrack(trackToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `Track updated`,
        });
    },
    deleteTrack: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = tracksServices.deleteTrack(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Track not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Track deleted`,
        });
    },
};

export default tracksControllers;