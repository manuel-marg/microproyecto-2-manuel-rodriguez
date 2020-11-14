import { Component, OnInit } from '@angular/core';
import { Favorito } from 'src/app/models/favorito';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritoService } from 'src/app/services/favorito.service';

@Component({
  selector: 'app-mis-favoritos',
  templateUrl: './mis-favoritos.component.html',
  styleUrls: ['./mis-favoritos.component.scss']
})
export class MisFavoritosComponent implements OnInit {
  characterFavorite: Favorito[];
  user: any=null;
  isAuthenticated: boolean = false;

  constructor( private favoritoService: FavoritoService , private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser()

  }

  getUserFavoriteCharacter()
  {
    this.characterFavorite =[]
    this.favoritoService.getAllFavoritos().subscribe((response) => {
      this.user ;
      var auxarr :any
      auxarr = response.map(
        (response) =>
          ({
            ...response.payload.doc.data(),
            $key: response.payload.doc.id,
          } as Favorito)
      );
      auxarr.forEach(element => {
              if(element.email == this.user.email)
              {
                console.log("ADDING")
                this.characterFavorite.push(element)
              }
            });
            console.log(this.characterFavorite)
    })
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        console.log(response)
        this.user = response;
        this.isAuthenticated = true;
        this.getUserFavoriteCharacter()
        
        return;
      }
      this.isAuthenticated = false;
    });
  }



}
