interface INewArtist { //Artistide interface
    name: string;
}

interface IArtist extends INewArtist {
    id: number;
}

interface IArtistWithId {
    name: string;
    id: number;
}

export { INewArtist, IArtist, IArtistWithId };