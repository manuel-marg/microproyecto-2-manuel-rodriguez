import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Favorito } from '../models/favorito';
import { FavoritoContador } from '../models/favorito-contador';


@Injectable({
  providedIn: 'root',
})
export class FavoritoService {
  private favoritoCollection: AngularFirestoreCollection<Favorito>;
  private favoritoContadorCollection: AngularFirestoreCollection<FavoritoContador>;

  constructor(private db: AngularFirestore) {
    this.favoritoCollection = this.db.collection<Favorito>('favoritos');
    this.favoritoContadorCollection = this.db.collection<FavoritoContador>('favoritosContador');
  }

  /**
   * GET ALL FAVORITOS
   */
  getAllFavoritos(): Observable<DocumentChangeAction<Favorito>[]> {
    return this.favoritoCollection.snapshotChanges();
  }


  /**
   * GET FAVORITO BY ID
   * @param favoritoId
   */
  getFavorito(favoritoId: string): Observable<Action<DocumentSnapshot<Favorito>>> {
    return this.favoritoCollection.doc<Favorito>(favoritoId).snapshotChanges();
  }

  /**
   * CREATE NEW FAVORITO
   * @param newFavorito
   */
  createFavorito(newFavorito: Favorito): Promise<DocumentReference> {
    return this.favoritoCollection.add(newFavorito);
  }

  /**
   * UPDATE SELECTED FAVORITO
   * @param data
   * @param docId
   */
  updateFavorito(data: Favorito, docId: string): Promise<void> {
    return this.favoritoCollection.doc<Favorito>(docId).update(data);
  }

  /**
   * DELETE FAVORITO
   * @param docId
   */
  deleteFavorito(docId: string): Promise<void> {
    return this.favoritoCollection.doc<Favorito>(docId).delete();
  }

    /**
   * GET ALL FAVORITOS
   */
  getAllFavoritosContador(): Observable<DocumentChangeAction<FavoritoContador>[]> {
    return this.favoritoContadorCollection.snapshotChanges();
  }

    /**
   * DELETE FAVORITO
   * @param docId
   */
  deleteFavoritoContador(docId: string): Promise<void> {
    return this.favoritoContadorCollection.doc<FavoritoContador>(docId).delete();
  }
 
    /**
   * CREATE NEW FAVORITO
   * @param newFavorito
   */
  createFavoritoContador(newFavorito: FavoritoContador): Promise<DocumentReference> {
    return this.favoritoContadorCollection.add(newFavorito);
  }
}
