import { Request, Response } from "express";
import { IReleaseType, INewReleaseType } from "./interfaces";
import releaseTypesServices from "./services";

const releaseTypesControllers = {
    getAllReleaseTypes: (req: Request, res: Response) => {
        const allReleaseTypes = releaseTypesServices.getAllReleaseTypes();
        res.status(200).json({
            success: true,
            message: 'List of release types',
            releases: allReleaseTypes,
        });
    },
    getReleaseTypeById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let releaseType: IReleaseType | undefined = releaseTypesServices.findReleaseTypeById(id);

        if (!releaseType) {
            return res.status(404).json({
                success: false,
                message: `Release type not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Release type`,
            data: {
                releaseType,
            },
        });
    },
    createReleaseType: (req: Request, res: Response) => {
        const { name } = req.body;
        
        const newReleaseType: INewReleaseType = {
            name
        }
        const id = releaseTypesServices.createReleaseType(newReleaseType);
        
        res.status(201).json({
            success: true,
            message: `Release type ${newReleaseType.name} with id ${id} created`,
        });
    },
    updateReleaseType: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const releaseType: IReleaseType | undefined = releaseTypesServices.findReleaseTypeById(id);
        if (!releaseType) {
            return res.status(404).json({
                success: false,
                message: `Release type not found`,
            });
        }
        if (!name) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const releaseTypeToUpdate: IReleaseType = {
            id,
            name
        }

        releaseTypesServices.updateReleaseType(releaseTypeToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `Release type updated`,
        });
    },
    deleteReleaseType: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = releaseTypesServices.deleteReleaseType(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Release type not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Release type deleted`,
        });
    },
};

export default releaseTypesControllers;