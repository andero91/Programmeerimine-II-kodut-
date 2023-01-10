interface INewRecordCompany { //Plaadifirmade interface
    name: string;
}

interface IRecordCompany extends INewRecordCompany {
    id: number;
}

export { INewRecordCompany, IRecordCompany };