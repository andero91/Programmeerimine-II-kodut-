interface INewReleaseType { //Väljaannete tüüpide interfacce
    name: string;
}

interface IReleaseType extends INewReleaseType {
    id: number;
}

export { INewReleaseType, IReleaseType };