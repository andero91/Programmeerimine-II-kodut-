//Lugudega tüüpidega seotud endpointid

import { tracks } from "../../mockData";
import { ITrack, INewTrack } from "./interfaces";

const tracksServices = {
    findTrackById: (id: number): ITrack | undefined => {
        let track: ITrack | undefined = tracks.find(element => {return element.id === id})
        return track;
    },
    getAllTracks: () => {
        return tracks;
    },
    createTrack: (track: INewTrack): number => {
        const id = tracks.length + 1;
        const newTrack: ITrack = {
            id,
            artistID: track.artistID,
            releaseID: track.releaseID,
            name: track.name,
        };
        tracks.push(newTrack);
        return id;
    },
    updateTrack: (trackToUpdate: ITrack): Boolean => {
        const { id, artistID, releaseID, name } = trackToUpdate;
        const track = tracksServices.findTrackById(id);
        if (track && artistID ) track.artistID = artistID;
        if (track && releaseID ) track.releaseID = releaseID;
        if (track && name) track.name = name;

        return true;
    },
    deleteTrack: (id: number): Boolean => {
        const index = tracks.findIndex(element => element.id === id);
        if (index === -1) return false;
        tracks.splice(index, 1);
        return true;
    }
}

export default tracksServices;