import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'firebase';
import { Character } from 'src/app/models/character';
import { Favorito } from 'src/app/models/favorito';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritoService } from 'src/app/services/favorito.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  user: User = null;
  isAuthenticated = false;
  showtable: boolean;
  @Input() characterRev: Character;
  @Output() back = new EventEmitter();
  characterFavorite: Favorito[];
  isFavoriteBool=false
  key: string;
loading= false;
  constructor(private authService: AuthService, private favoritoService : FavoritoService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  volver(): void {
    this.back.emit()
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
            this.isFavorite()
    })
  }


  isFavorite()
{
  console.log(this.characterFavorite)
  this.key=""
  this.characterFavorite.forEach(element => {
    console.log("comparando: "+this.characterRev.name+ " con "+element.character.name)
    if(this.characterRev.name==element.character.name)
    {
      this.isFavoriteBool=true
      this.key=element.$key
    }
  });
}

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        console.log()
        this.user = response;
        this.isAuthenticated = true;
        this.getUserFavoriteCharacter()
        
        return;
      }
      this.isAuthenticated = false;
    });
  }

  

  onSubmit(): void {
    this.loading=true
    const dataFavorito: Favorito = {
      
      email: this.user.email,
      character: this.characterRev
     
    };
    this.loading=false
    console.log(dataFavorito)
    this.favoritoService.createFavorito(dataFavorito);
  }

  deleteFavorite(): void {
    this.loading=true
    this.favoritoService.deleteFavorito(this.key).then((res) => {
      this.isFavoriteBool = false
      this.loading=false
    });
    
  }


}
