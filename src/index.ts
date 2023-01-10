import express, { Request, Response, Express, NextFunction } from 'express';
import artistsControllers from './components/artists/controllers';
import artistsMiddlewares from './components/artists/middlewares';
import recordCompaniesControllers from './components/recordcompanies/controllers';
import recordCompaniesMiddlewares from './components/recordcompanies/middlewares';
import releasesControllers from './components/releases/controllers';
import releasesMiddlewares from './components/releases/middlewares';
import releaseTypesControllers from './components/releasetypes/controllers';
import releaseTypesMiddlewares from './components/releasetypes/middlewares';
import tracksControllers from './components/tracks/controllers';
import tracksMiddlewares from './components/tracks/middlewares';

const app: Express = express();
const port: number = 3000;

app.use(express.json()); //Võtab Request objektist info ja tekitab Request body kirje, kuhu salvestab saadetud info

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next();
}; //Logib, millal ja millise meetodiga millise endpointi poole pöörduti

app.use(logger);

//Artistidega seotud endpointid
//Kõikide artistide pärimine
app.get('/api/v1/artists', artistsControllers.getAllArtists);
//Uue artisti lisamine
app.post('/api/v1/artists', artistsMiddlewares.createArtistCheckData, artistsControllers.createArtist);
//Artisti pärimine id alusel
app.get('/api/v1/artists/:id', artistsControllers.getArtistById);
//Artisti kustutamine id alusel
app.delete('/api/v1/artists/:id', artistsControllers.deleteArtist);
//Artisti (nime) muutmine
app.patch('/api/v1/artists/:id', artistsControllers.updateArtist);

//Plaadifirmadega seotud endpointid
//Kõikide plaadifirmade pärimine
app.get('/api/v1/recordcompanies', recordCompaniesControllers.getAllRecordCompanies);
//Uue plaadifirma lisamine
app.post('/api/v1/recordcompanies', recordCompaniesMiddlewares.createRecordCompanyCheckData, recordCompaniesControllers.createRecordCompany);
//Plaadifirma pärimine id alusel
app.get('/api/v1/recordcompanies/:id', recordCompaniesControllers.getRecordCompanyById);
//Plaadifirma kustutamine id alusel
app.delete('/api/v1/recordcompanies/:id', recordCompaniesControllers.deleteRecordCompany);
//Plaadifirma (nime) muutmine
app.patch('/api/v1/recordcompanies/:id', recordCompaniesControllers.updateRecordCompany);

//Lugudega seotud endpointid
//Kõikide lugude pärimine
app.get('/api/v1/tracks', tracksControllers.getAllTracks);
//Uue loo lisamine
app.post('/api/v1/tracks', tracksMiddlewares.createTrackCheckData, tracksControllers.createTrack);
//Loo pärimine id alusel
app.get('/api/v1/tracks/:id', tracksControllers.getTrackById);
//Loo kustutamine id alusel
app.delete('/api/v1/tracks/:id', tracksControllers.deleteTrack);
//Loo muutmine
app.patch('/api/v1/tracks/:id', tracksControllers.updateTrack);

//Väljaannetega seotud endpointid
//Kõikide väljaannete pärimine
app.get('/api/v1/releases', releasesControllers.getAllReleases);
//Uue väljaande lisamine
app.post('/api/v1/releases', releasesMiddlewares.createReleaseCheckData, releasesControllers.createRelease);
//Väljaande pärimine id alusel
app.get('/api/v1/releases/:id', releasesControllers.getReleaseById);
//Väljaande kustutamine id alusel
app.delete('/api/v1/releases/:id', releasesControllers.deleteRelease);
//Väljaande muutmine
app.patch('/api/v1/releases/:id', releasesControllers.updateRelease);

//Väljaande tüüpidega seotud endpointid
//Kõikide väljaande tüüpide pärimine
app.get('/api/v1/releasetypes', releaseTypesControllers.getAllReleaseTypes);
//Uue väljaande tüübi lisamine
app.post('/api/v1/releasetypes', releaseTypesMiddlewares.createReleaseTypeCheckData, releaseTypesControllers.createReleaseType);
//Väljaande tüübi pärimine id alusel
app.get('/api/v1/releasetypes/:id', releaseTypesControllers.getReleaseTypeById);
//Väljaande tüübi muutmine
app.patch('/api/v1/releasetypes/:id', releaseTypesControllers.updateReleaseType);
//Väljaande tüübi kustutamine id alusel
app.delete('/api/v1/releasetypes/:id', releaseTypesControllers.deleteReleaseType);

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