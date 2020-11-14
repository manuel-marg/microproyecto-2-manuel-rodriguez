import { Origin } from './origin';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: any;
    location: any;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
    haveLike?: boolean;
    likes?: number;
}
