import { IArtist } from "./components/artists/interfaces"
import { IRecordCompany } from "./components/recordcompanies/interfaces"
import { IRelease } from "./components/releases/interfaces"
import { ITrack } from "./components/tracks/interfaces"
import { IReleaseType } from "./components/releasetypes/interfaces"
import { IUser } from "./components/users/interfaces"

//Artistide massiiv
const artists: IArtist[] = [
    {
        id: 1,
        name: 'Juhan & the Juurikad'
    },
    {
        id: 2,
        name: 'Juhani sooloprojekt'
    }
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
];

//Kasutajate massiiv
const users: IUser[] = [
    {
        id: 1,
        email: "test@test.ee",
        username: "admin",
        password: "$2b$10$jWtRQfv2AA4a75U/cYdG1u0svCtwfAQwzfgHbXdynNwzuif2uqm7u",
        role: "Admin",
    },
    {
        id: 2,
        email: "tavakasutaja@test.ee",
        username: "user1",
        password: "$2b$10$jWtRQfv2AA4a75U/cYdG1u0svCtwfAQwzfgHbXdynNwzuif2uqm7u",
        role: "User",
    },
];

export { artists, recordCompanies, releases, tracks, releasetypes, users };