import { Character } from './character';

export interface Favorito {
    $key?: string;
    email: string;
    character: Character;
}
