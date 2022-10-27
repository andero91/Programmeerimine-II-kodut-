import express, { Request, Response, Express } from 'express';

const app: Express = express();
const port: number = 3000;

app.use(express.json()); //Võtab Request objektist info ja tekitab Request body kirje, kuhu salvestab saadetud info

interface INewArtist { //Artistide interface
    name: string;
}

interface IArtist extends INewArtist {
    id: number;
}

interface INewRecordCompany { //Plaadifirmade interface
    name: string;
}

interface IRecordCompany extends INewRecordCompany {
    id: number;
}

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

interface INewTrack { // Lugude interface
    artistID: number;
    releaseID: number;
    name: string;
}

interface ITrack extends INewTrack {
    id: number;
}

interface INewReleaseType { //Väljaannete tüüpide interfacce
    name: string;
}

interface IReleaseType extends INewReleaseType {
    id: number;
}

//Artistide massiiv
const artists: IArtist[] = [
    {
        id: 1,
        name: 'Juhan & the Juurikad'
    },
]

//Plaadifirmade massiiv
const recordCompanies: IRecordCompany[] = [
    {
        id: 1,
        name: 'Universal Music'
    },
]

//Väljaannete massiiv
const releases: IRelease[] = [
    {
        id: 1,
        artistID: 1,
        recordCompanyID: 1,
        name: 'Juurikate plaat',
        type: 1,
        releaseDate: new Date(2022, 0, 1)
    }
]

//Lugude massiiv
const tracks: ITrack[] = [
    {
        id: 1,
        artistID: 1,
        releaseID: 1,
        name: 'Juurikate plaadi avalugu'
    }
]

//Väljaannete tüüpide massiiv
const releasetypes: IReleaseType[] = [
    {
        id: 1,
        name: "Album",
    },
    {
        id: 2,
        name: "Single",
    }
]

//Artistidega seotud endpointid
//Kõikide artistide pärimine
app.get('/api/v1/artists', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of artists',
        artists,
    });
});

//Uue artisti lisamine
app.post('/api/v1/artists', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: `Artist name missing`,
        });
    }
    const id = artists.length + 1;
    const newArtist: IArtist = {
        id,
        name,
    };
    artists.push(newArtist);
    
    res.status(201).json({
        success: true,
        message: `Artist ${newArtist.name} with id ${newArtist.id} created`,
    });
});

//Artisti pärimine id alusel
app.get('/api/v1/artists/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const artist = artists.find(element => {
        return element.id === id;
    });
    if (!artist) {
        return res.status(404).json({
            success: false,
            message: `Artist not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Artist`,
        data: {
            artist,
        },
    });
});

//Artisti kustutamine id alusel
app.delete('/api/v1/artists/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = artists.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Artist not found`,
        });
    }
    artists.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Artist deleted`,
    });
});

//Artisti (nime) muutmine
app.patch('/api/v1/artists/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const artist = artists.find(element => {
        return element.id === id;
    });
    if (!artist) {
        return res.status(404).json({
            success: false,
            message: `Artist not found`,
        });
    }
    if (!name) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (name) artist.name = name;

    return res.status(200).json({
        success: true,
        message: `Artist updated`,
    });
});

//Plaadifirmadega seotud endpointid
//Kõikide plaadifirmade pärimine
app.get('/api/v1/recordcompanies', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of record companies',
        recordCompanies,
    });
});

//Uue plaadifirma lisamine
app.post('/api/v1/recordcompanies', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: `Record company name missing`,
        });
    }
    const id = recordCompanies.length + 1;
    const newRecordCompany: IRecordCompany = {
        id,
        name,
    };
    recordCompanies.push(newRecordCompany);
    
    res.status(201).json({
        success: true,
        message: `Record company ${newRecordCompany.name} with id ${newRecordCompany.id} created`,
    });
});

//Plaadifirma pärimine id alusel
app.get('/api/v1/recordcompanies/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const recordCompany = recordCompanies.find(element => {
        return element.id === id;
    });
    if (!recordCompany) {
        return res.status(404).json({
            success: false,
            message: `Record company not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Record company`,
        data: {
            recordCompany,
        },
    });
});

//Plaadifirma kustutamine id alusel
app.delete('/api/v1/recordcompanies/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = recordCompanies.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Record company not found`,
        });
    }
    recordCompanies.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Record company deleted`,
    });
});

//Plaadifirma (nime) muutmine
app.patch('/api/v1/recordcompanies/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const recordCompany = recordCompanies.find(element => {
        return element.id === id;
    });
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

    if (name) recordCompany.name = name;

    return res.status(200).json({
        success: true,
        message: `Record company updated`,
    });
});

//Lugudega seotud endpointid
//Kõikide lugude pärimine
app.get('/api/v1/tracks', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of tracks',
        tracks,
    });
});

//Uue loo lisamine
app.post('/api/v1/tracks', (req: Request, res: Response) => {
    const { artistID, releaseID, name } = req.body;
    if (!artistID || !releaseID || !name ) {
        return res.status(400).json({
            success: false,
            message: `ArtistID, ReleaseID or Name missing`,
        });
    }
    const id = tracks.length + 1;
    const newTrack: ITrack = {
        artistID,
        releaseID,
        name,
        id
    };
    tracks.push(newTrack);
    
    res.status(201).json({
        success: true,
        message: `Track ${newTrack.name} created`,
    });
});

//Loo pärimine id alusel
app.get('/api/v1/tracks/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const track = tracks.find(element => {
        return element.id === id;
    });
    if (!track) {
        return res.status(404).json({
            success: false,
            message: `Track not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Track`,
        data: {
            track,
        },
    });
});

//Loo kustutamine id alusel
app.delete('/api/v1/tracks/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = tracks.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Track not found`,
        });
    }
    tracks.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Track deleted`,
    });
});

//Loo muutmine
app.patch('/api/v1/tracks/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { artistID, releaseID, name } = req.body;
    const track = tracks.find(element => {
        return element.id === id;
    });
    if (!track) {
        return res.status(404).json({
            success: false,
            message: `Track not found`,
        });
    }
    if (!artistID && !releaseID && !name ) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (artistID) track.artistID = artistID;
    if (releaseID) track.releaseID = releaseID;
    if (name) track.name = name;

    return res.status(200).json({
        success: true,
        message: `Track updated`,
    });
});

//Väljaannetega seotud endpointid
//Kõikide väljaannete pärimine
app.get('/api/v1/releases', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of releases',
        releases,
    });
});

//Uue väljaande lisamine
app.post('/api/v1/releases', (req: Request, res: Response) => {
    const { artistID, recordCompanyID, name, type, releaseDate } = req.body;
    if (!artistID || !recordCompanyID || !name || !type || !releaseDate) {
        return res.status(400).json({
            success: false,
            message: `ArtistID, RecordCompanyID, Name, Type or Release Date missing`,
        });
    }
    const id = releases.length + 1;
    const newRelease: IRelease = {
        artistID,
        recordCompanyID,
        name,
        type,
        releaseDate,
        id
    };
    releases.push(newRelease);
    
    res.status(201).json({
        success: true,
        message: `Release ${newRelease.name} with id ${newRelease.id} created`,
    });
});

//Väljaande pärimine id alusel
app.get('/api/v1/releases/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const release = releases.find(element => {
        return element.id === id;
    });
    if (!release) {
        return res.status(404).json({
            success: false,
            message: `Release not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Release`,
        data: {
            release,
        },
    });
});

//Väljaande kustutamine id alusel
app.delete('/api/v1/releases/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = releases.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Release not found`,
        });
    }
    releases.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Release deleted`,
    });
});

//Väljaande muutmine
app.patch('/api/v1/releases/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { artistID, recordCompanyID, name, type, releaseDate } = req.body;
    const release = releases.find(element => {
        return element.id === id;
    });
    if (!release) {
        return res.status(404).json({
            success: false,
            message: `Release not found`,
        });
    }
    if (!artistID && !recordCompanyID && !name && !type && !releaseDate) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (artistID) release.artistID = artistID;
    if (recordCompanyID) release.recordCompanyID = recordCompanyID;
    if (name) release.name = name;
    if (type) release.type = type;
    if (releaseDate) release.releaseDate = releaseDate;

    return res.status(200).json({
        success: true,
        message: `Release updated`,
    });
});

//Väljaande tüüpidega seotud endpointid
//Kõikide väljaande tüüpide pärimine
app.get('/api/v1/releasetypes', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of release types',
        releasetypes,
    });
});

//Uue väljaande tüübi lisamine
app.post('/api/v1/releasetypes', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name ) {
        return res.status(400).json({
            success: false,
            message: `Release type name missing`,
        });
    }
    const id = releasetypes.length + 1;
    const newReleaseType: IReleaseType = {
        name,
        id
    };
    releasetypes.push(newReleaseType);
    
    res.status(201).json({
        success: true,
        message: `Release type ${newReleaseType.name} with id ${newReleaseType.id} created`,
    });
});

//Väljaande tüübi pärimine id alusel
app.get('/api/v1/releasetypes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const releasetype = releasetypes.find(element => {
        return element.id === id;
    });
    if (!releasetype) {
        return res.status(404).json({
            success: false,
            message: `Release type not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Release Type`,
        data: {
            releasetype,
        },
    });
});

//Väljaande tüübi muutmine
app.patch('/api/v1/releasetypes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const releasetype = releasetypes.find(element => {
        return element.id === id;
    });
    if (!releasetype) {
        return res.status(404).json({
            success: false,
            message: `Release type not found`,
        });
    }
    if (!name) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (name) releasetype.name = name;

    return res.status(200).json({
        success: true,
        message: `Release type updated`,
    });
});

//Endpoint, mis kontrollib kas API töötab
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello world!',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});