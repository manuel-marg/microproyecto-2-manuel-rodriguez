import { Character } from './character';

export interface FavoritoContador {
    $key?: string;
    character: Character;
    cont: number;

}
