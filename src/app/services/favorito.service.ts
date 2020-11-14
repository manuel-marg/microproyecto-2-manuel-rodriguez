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


@Injectable({
  providedIn: 'root',
})
export class FavoritoService {
  private favoritoCollection: AngularFirestoreCollection<Favorito>;

  constructor(private db: AngularFirestore) {
    this.favoritoCollection = this.db.collection<Favorito>('favoritos');
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
}
