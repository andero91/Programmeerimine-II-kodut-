interface INewTrack { // Lugude interface
    artistID: number;
    releaseID: number;
    name: string;
}

interface ITrack extends INewTrack {
    id: number;
}

export { INewTrack, ITrack };