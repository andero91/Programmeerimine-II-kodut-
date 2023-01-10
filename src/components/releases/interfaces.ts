interface INewRelease { //Väljaannete interface
    artistID: number;
    recordCompanyID: number;
    name: string;
    type: number;
    releaseDate: Date;
}

interface IRelease extends INewRelease {
    id: number;
}

export { INewRelease, IRelease };