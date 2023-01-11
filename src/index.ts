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
import usersControllers from './components/users/controllers';
import usersMiddlewares from './components/users/middlewares';
import authController from './components/auth/controllers';
import authMiddleware from './components/auth/middlewares';

const app: Express = express();
const port: number = 3000;
const apiPath = 'api/v1'; //TO-DO: asendada endpointides
//TO-DO: Lisada routes

app.use(express.json()); //Võtab Request objektist info ja tekitab Request body kirje, kuhu salvestab saadetud info

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next();
}; //Logib, millal ja millise meetodiga millise endpointi poole pöörduti

app.use(logger);

//Sisselogimisega seotud endpoint
app.post('/api/v1/login', authController.login);

//Endpoint, mis kontrollib kas API töötab
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello world!',
  });
});

//Artistidega seotud endpointid - ligipääs ainult Admin rolliga kasutajatele
//Kõikide artistide pärimine
app.get('/api/v1/artists', authMiddleware.isLoggedIn, artistsControllers.getAllArtists);
//Uue artisti lisamine
app.post('/api/v1/artists', authMiddleware.isLoggedIn, authMiddleware.isAdmin, artistsMiddlewares.createArtistCheckData, artistsControllers.createArtist);
//Artisti pärimine id alusel
app.get('/api/v1/artists/:id', authMiddleware.isLoggedIn, artistsControllers.getArtistById);
//Artisti kustutamine id alusel
app.delete('/api/v1/artists/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, artistsControllers.deleteArtist);
//Artisti (nime) muutmine
app.patch('/api/v1/artists/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, artistsControllers.updateArtist);

//Plaadifirmadega seotud endpointid
//Kõikide plaadifirmade pärimine
app.get('/api/v1/recordcompanies', authMiddleware.isLoggedIn, recordCompaniesControllers.getAllRecordCompanies);
//Uue plaadifirma lisamine
app.post('/api/v1/recordcompanies', authMiddleware.isLoggedIn, authMiddleware.isAdmin, recordCompaniesMiddlewares.createRecordCompanyCheckData, recordCompaniesControllers.createRecordCompany);
//Plaadifirma pärimine id alusel
app.get('/api/v1/recordcompanies/:id', authMiddleware.isLoggedIn, recordCompaniesControllers.getRecordCompanyById);
//Plaadifirma kustutamine id alusel
app.delete('/api/v1/recordcompanies/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, recordCompaniesControllers.deleteRecordCompany);
//Plaadifirma (nime) muutmine
app.patch('/api/v1/recordcompanies/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, recordCompaniesControllers.updateRecordCompany);

//Lugudega seotud endpointid
//Kõikide lugude pärimine
app.get('/api/v1/tracks', authMiddleware.isLoggedIn, tracksControllers.getAllTracks);
//Uue loo lisamine
app.post('/api/v1/tracks', authMiddleware.isLoggedIn, authMiddleware.isAdmin, tracksMiddlewares.createTrackCheckData, tracksControllers.createTrack);
//Loo pärimine id alusel
app.get('/api/v1/tracks/:id', authMiddleware.isLoggedIn, tracksControllers.getTrackById);
//Loo kustutamine id alusel
app.delete('/api/v1/tracks/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, tracksControllers.deleteTrack);
//Loo muutmine
app.patch('/api/v1/tracks/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, tracksControllers.updateTrack);

//Väljaannetega seotud endpointid
//Kõikide väljaannete pärimine
app.get('/api/v1/releases', authMiddleware.isLoggedIn, releasesControllers.getAllReleases);
//Uue väljaande lisamine
app.post('/api/v1/releases', authMiddleware.isLoggedIn, authMiddleware.isAdmin, releasesMiddlewares.createReleaseCheckData, releasesControllers.createRelease);
//Väljaande pärimine id alusel
app.get('/api/v1/releases/:id', authMiddleware.isLoggedIn, releasesControllers.getReleaseById);
//Väljaande kustutamine id alusel
app.delete('/api/v1/releases/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, releasesControllers.deleteRelease);
//Väljaande muutmine
app.patch('/api/v1/releases/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, releasesControllers.updateRelease);

//Väljaande tüüpidega seotud endpointid
//Kõikide väljaande tüüpide pärimine
app.get('/api/v1/releasetypes', authMiddleware.isLoggedIn, releaseTypesControllers.getAllReleaseTypes);
//Uue väljaande tüübi lisamine
app.post('/api/v1/releasetypes', authMiddleware.isLoggedIn, authMiddleware.isAdmin, releaseTypesMiddlewares.createReleaseTypeCheckData, releaseTypesControllers.createReleaseType);
//Väljaande tüübi pärimine id alusel
app.get('/api/v1/releasetypes/:id', authMiddleware.isLoggedIn, releaseTypesControllers.getReleaseTypeById);
//Väljaande tüübi muutmine
app.patch('/api/v1/releasetypes/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, releaseTypesControllers.updateReleaseType);
//Väljaande tüübi kustutamine id alusel
app.delete('/api/v1/releasetypes/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, releaseTypesControllers.deleteReleaseType);

//kasutajatega seotud endpointid
//Kõikide kasutajate pärimine
app.get('/api/v1/users', authMiddleware.isLoggedIn, authMiddleware.isAdmin, usersControllers.getAllUsers);
//Uue kasutaja lisamine
app.post('/api/v1/users', usersMiddlewares.createUserCheckData, usersControllers.createUser);
//Kasutaja pärimine id alusel
app.get('/api/v1/users/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, usersControllers.getUserById);
//Kasutaja muutmine
app.patch('/api/v1/users/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, usersControllers.updateUser);
//Kasutaja kustutamine id alusel
app.delete('/api/v1/users/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, usersControllers.deleteUser);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});