//Artistidega seotud endpointid

import { artists } from "../../mockData";
import { IArtist, INewArtist } from "./interfaces";

const artistsServices = {
    findArtistById: (id: number): IArtist | undefined => {
        let artist: IArtist | undefined = artists.find(element => {return element.id === id})
        return artist;
    },
    getAllArtists: () => {
        return artists;
    },
    createArtist: (artist: INewArtist): number => {
        const id = artists.length + 1;
        const newArtist: IArtist = {
            id,
            name: artist.name
        };
        artists.push(newArtist);
        return id;
    },
    updateArtist: (artistToUpdate: IArtist): Boolean => {
        const { id, name } = artistToUpdate;
        const artist = artistsServices.findArtistById(id);
        if (artist && name) artist.name = name;

        return true;
    },
    deleteArtist: (id: number): Boolean => {
        const index = artists.findIndex(element => element.id === id);
        if (index === -1) return false;
        artists.splice(index, 1);
        return true;
    }
}

//Kõikide artistide pärimine
/*
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

/*
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

*/

export default artistsServices;