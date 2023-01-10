### Ressursid, endpointid

### API töötamise kontrollimine
- `GET /api/v1/health/`

### Väljaannetega seotud
- Kõikide väljaannete pärimine: `GET /api/v1/releases/`
- Väljaande pärimine ID alusel: `GET /api/v1/releases/:id`
- Väljaande lisamine: `POST /api/v1/releases/`
- Väljaande muutmine: `PATCH /api/v1/releases/:id`
- Väljaande kustutamine: `DELETE /api/v1/releases/:id`

### Lugudega seotud
- Kõikide lugude pärimine: `GET /api/v1/tracks/`
- Loo pärimine ID alusel: `GET /api/v1/tracks/:id`
- Loo lisamine: `POST /api/v1/tracks/`
- Loo muutmine: `PATCH /api/v1/tracks/:id`
- Loo kustutamine: `DELETE /api/v1/tracks/:id`

### Artistidega seotud
- Kõikide artistide pärimine: `GET /api/v1/artists/`
- Artisti pärimine ID alusel: `GET /api/v1/artists/:id`
- Artisti lisamine: `POST /api/v1/artists/`
- Artisti muutmine: `PATCH /api/v1/artists/:id`
- Artisti kustutamine: `DELETE /api/v1/artists/:id`

### Plaadifirmadega seotud
- Kõikide plaadifirmade pärimine: `GET /api/v1/recordcompanies/`
- Plaadifirma pärimine ID alusel: `GET /api/v1/recordcompanies/:id`
- Plaadifirma lisamine: `POST /api/v1/recordcompanies/`
- Plaadifirma muutmine: `PATCH /api/v1/recordcompanies/:id`
- Plaadifirma kustutamine: `DELETE /api/v1/recordcompanies/:id`

### Väljaande tüüpidega seotud
- Kõikide väljaande tüüpide pärimine: `GET /api/v1/releasetypes/`
- Väljaande tüübi pärimine ID alusel: `GET /api/v1/releasetypes/:id`
- Väljaande tüübi lisamine: `POST /api/v1/releasetypes/`
- Väljaande tüübi muutmine: `PATCH /api/v1/releasetypes/:id`
- Väljaande tüübi kustutamine: `DELETE /api/v1/releasetypes/:id`