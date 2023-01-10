import { Request, Response } from "express";
import { IRecordCompany, INewRecordCompany } from "./interfaces";
import recordCompaniesServices from "./services";

const recordCompaniesControllers = {
    getAllRecordCompanies: (req: Request, res: Response) => {
        const allRecordCompanies = recordCompaniesServices.getAllRecordCompanies();
        res.status(200).json({
            success: true,
            message: 'List of record companies',
            recordCompanies: allRecordCompanies,
        });
    },
    getRecordCompanyById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let recordCompany: IRecordCompany | undefined = recordCompaniesServices.findRecordCompanyById(id);

        if (!recordCompany) {
            return res.status(404).json({
                success: false,
                message: `Record Company not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Record Company`,
            data: {
                recordCompany,
            },
        });
    },
    createRecordCompany: (req: Request, res: Response) => {
        const { name } = req.body;
        
        const newRecordCompany: INewRecordCompany = {
            name
        }
        const id = recordCompaniesServices.createRecordCompany(newRecordCompany);
        
        res.status(201).json({
            success: true,
            message: `Record company ${newRecordCompany.name} with id ${id} created`,
        });
    },
    updateRecordCompany: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const recordCompany: IRecordCompany | undefined = recordCompaniesServices.findRecordCompanyById(id);
        if (!recordCompany) {
            return res.status(404).json({
                success: false,
                message: `Record company not found`,
            });
        }
        if (!name) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const recordCompanyToUpdate: IRecordCompany = {
            id,
            name
        }

        recordCompaniesServices.updateRecordCompany(recordCompanyToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `Record company updated`,
        });
    },
    deleteRecordCompany: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = recordCompaniesServices.deleteRecordCompany(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Record company not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Record company deleted`,
        });
    },
};

export default recordCompaniesControllers;