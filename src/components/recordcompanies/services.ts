//Plaadifirmadega seotud endpointid

import { recordCompanies } from "../../mockData";
import { IRecordCompany, INewRecordCompany } from "./interfaces";

const recordCompaniesServices = {
    findRecordCompanyById: (id: number): IRecordCompany | undefined => {
        let recordCompany: IRecordCompany | undefined = recordCompanies.find(element => {return element.id === id})
        return recordCompany;
    },
    getAllRecordCompanies: () => {
        return recordCompanies;
    },
    createRecordCompany: (recordCompany: INewRecordCompany): number => {
        const id = recordCompanies.length + 1;
        const newRecordCompany: IRecordCompany = {
            id,
            name: recordCompany.name
        };
        recordCompanies.push(newRecordCompany);
        return id;
    },
    updateRecordCompany: (recordCompanyToUpdate: IRecordCompany): Boolean => {
        const { id, name } = recordCompanyToUpdate;
        const recordCompany = recordCompaniesServices.findRecordCompanyById(id);
        if (recordCompany && name) recordCompany.name = name;
        return true;
    },
    deleteRecordCompany: (id: number): Boolean => {
        const index = recordCompanies.findIndex(element => element.id === id);
        if (index === -1) return false;
        recordCompanies.splice(index, 1);
        return true;
    }
}

export default recordCompaniesServices;