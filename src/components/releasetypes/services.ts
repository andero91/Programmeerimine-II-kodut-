//Väljaande tüüpidega seotud endpointid

import { releasetypes } from "../../mockData";
import { IReleaseType, INewReleaseType } from "./interfaces";

const releaseTypesServices = {
    findReleaseTypeById: (id: number): IReleaseType | undefined => {
        let releaseType: IReleaseType | undefined = releasetypes.find(element => {return element.id === id})
        return releaseType;
    },
    getAllReleaseTypes: () => {
        return releasetypes;
    },
    createReleaseType: (releaseType: INewReleaseType): number => {
        const id = releasetypes.length + 1;
        const newReleaseType: IReleaseType = {
            id,
            name: releaseType.name,
        };
        releasetypes.push(newReleaseType);
        return id;
    },
    updateReleaseType: (releaseTypeToUpdate: IReleaseType): Boolean => {
        const { id, name } = releaseTypeToUpdate;
        const releaseType = releaseTypesServices.findReleaseTypeById(id);
        if (releaseType && name) releaseType.name = name;

        return true;
    },
    deleteReleaseType: (id: number): Boolean => {
        const index = releasetypes.findIndex(element => element.id === id);
        if (index === -1) return false;
        releasetypes.splice(index, 1);
        return true;
    }
}

export default releaseTypesServices;