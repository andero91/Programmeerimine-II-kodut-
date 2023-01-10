import { Request, Response } from "express";
import { IRelease, INewRelease } from "./interfaces";
import releasesServices from "./services";

const releasesControllers = {
    getAllReleases: (req: Request, res: Response) => {
        const allReleases = releasesServices.getAllReleases();
        res.status(200).json({
            success: true,
            message: 'List of releases',
            releases: allReleases,
        });
    },
    getReleaseById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let release: IRelease | undefined = releasesServices.findReleaseById(id);

        if (!release) {
            return res.status(404).json({
                success: false,
                message: `Release not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Release`,
            data: {
                release,
            },
        });
    },
    createRelease: (req: Request, res: Response) => {
        const { artistID, recordCompanyID, name, type, releaseDate } = req.body;
        
        const newRelease: INewRelease = {
            artistID, recordCompanyID, name, type, releaseDate
        }
        const id = releasesServices.createRelease(newRelease);
        
        res.status(201).json({
            success: true,
            message: `Release ${newRelease.name} with id ${id} created`,
        });
    },
    updateRelease: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { artistID, recordCompanyID, name, type, releaseDate } = req.body;
        const release: IRelease | undefined = releasesServices.findReleaseById(id);
        if (!release) {
            return res.status(404).json({
                success: false,
                message: `Release not found`,
            });
        }
        if (!name && !artistID && !recordCompanyID && !type && !releaseDate) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const releaseToUpdate: IRelease = {
            id,
            artistID,
            recordCompanyID,
            name,
            type,
            releaseDate
        }

        releasesServices.updateRelease(releaseToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `Release updated`,
        });
    },
    deleteRelease: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = releasesServices.deleteRelease(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Release not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Release deleted`,
        });
    },
};

export default releasesControllers;