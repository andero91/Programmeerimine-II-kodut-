USE recordings_database;

/* Artists */
INSERT INTO Artists (name)
	VALUES
		('Juhan and the Juurikad'),
        ('Juhani sooloprojekt');

/* Record Companies */
INSERT INTO RecordCompanies (name)
	VALUES
		('Universal Music');
        

/* Release Types */
INSERT INTO ReleaseTypes (id, name)
	VALUES
		(1, 'Album'),
        (2, 'Single');
        
/* Releases */
INSERT INTO Releases SET artistID = 1, recordCompanyID = 1, name = 'Juurikate plaat', type = 1, releaseDate = '2022-01-01';

/* Tracks */
INSERT INTO Tracks SET artistID = 1, releaseID = 2, name = 'Juurikate plaadi avalugu';

/* Users */
INSERT INTO Users SET email = 'test@test.ee', username = 'admin', password = '$2b$10$jWtRQfv2AA4a75U/cYdG1u0svCtwfAQwzfgHbXdynNwzuif2uqm7u', role = 'Admin';
INSERT INTO Users SET email = 'tavakasutaja@test.ee', username = 'user1', password = '$2b$10$jWtRQfv2AA4a75U/cYdG1u0svCtwfAQwzfgHbXdynNwzuif2uqm7u', role = 'User';