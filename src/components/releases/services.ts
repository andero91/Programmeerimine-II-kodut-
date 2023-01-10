//Väljaannetega seotud endpointid

import { releases } from "../../mockData";
import { IRelease, INewRelease } from "./interfaces";

const releasesServices = {
    findReleaseById: (id: number): IRelease | undefined => {
        let release: IRelease | undefined = releases.find(element => {return element.id === id})
        return release;
    },
    getAllReleases: () => {
        return releases;
    },
    createRelease: (release: INewRelease): number => {
        const id = releases.length + 1;
        const newRelease: IRelease = {
            id,
            artistID: release.artistID,
            recordCompanyID: release.recordCompanyID,
            name: release.name,
            type: release.type,
            releaseDate: release.releaseDate
        };
        releases.push(newRelease);
        return id;
    },
    updateRelease: (releaseToUpdate: IRelease): Boolean => {
        const { id, artistID, recordCompanyID, name, type, releaseDate } = releaseToUpdate;
        const release = releasesServices.findReleaseById(id);
        if (release && name) release.name = name;
        if (release && artistID) release.artistID = artistID;
        if (release && recordCompanyID) release.recordCompanyID = recordCompanyID;
        if (release && type) release.type = type;
        if (release && releaseDate) release.releaseDate = releaseDate;

        return true;
    },
    deleteRelease: (id: number): Boolean => {
        const index = releases.findIndex(element => element.id === id);
        if (index === -1) return false;
        releases.splice(index, 1);
        return true;
    }
}

export default releasesServices;