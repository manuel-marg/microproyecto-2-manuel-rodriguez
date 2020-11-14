import { Origin } from './origin';

export interface Character {
    id: number;
    name: string;
    status: string;
    spacies: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
    haveLike?: boolean;
    likes?: number;
}
