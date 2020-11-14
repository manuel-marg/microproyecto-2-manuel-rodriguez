import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'firebase';
import { Character } from 'src/app/models/character';
import { Favorito } from 'src/app/models/favorito';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FavoritoContador } from '../../models/favorito-contador'

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
  loading = false;
  cantidadFav: FavoritoContador; 
  favoritoContadorArray: FavoritoContador[]=[];
  cantidaddefavoritosporpersonaje=0
  cantidadFavoritoskey: string;

  constructor(private authService: AuthService, private favoritoService : FavoritoService , private favoritoContador :  FavoritoService) { }

  ngOnInit(): void {
    this.getCurrentUser()
    this.favoriteUpdate()
  }

  volver(): void {
    this.back.emit()
  }


  

  getUserFavoriteCharacter()
  {
    this.characterFavorite =[]
    this.cantidaddefavoritosporpersonaje=0
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
          var  fav=0
      auxarr.forEach(element => {
              if(element.email == this.user.email)
              {
                console.log("ADDING")
                this.characterFavorite.push(element)
              }
              
              if(element.character.name == this.characterRev.name)
              {
                console.log("ADDING count")
               fav=fav+1
              }
               
              this.cantidaddefavoritosporpersonaje= fav

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
        this.cantidadFavoritos()
    
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
      this.getUserFavoriteCharacter();
      this.isFavoriteBool = false
      this.loading=false
    });
    
    
  }

  favoriteUpdate()
  {
 
    this.characterFavorite =[]
    this.cantidaddefavoritosporpersonaje=0
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
          var  fav=0
      auxarr.forEach(element => {
                           
              if(element.character.name == this.characterRev.name)
              {
                console.log("ADDING count")
               fav=fav+1
              }
               
              this.cantidaddefavoritosporpersonaje= fav

            });
            console.log(this.characterFavorite)
            this.isFavorite()
    })
  }

  cantidadFavoritos(): void{

      this.loading = true;
      this.favoritoContador.getAllFavoritosContador().subscribe((items) => {
        this.favoritoContadorArray = items.map(
          (item) =>
            ({
              ...item.payload.doc.data(),
              $key: item.payload.doc.id,
            } as FavoritoContador)
        );
        this.cantidadFavoritosPorPersonaje()
  
        this.loading = false;
      });
    
  }

  cantidadFavoritosPorPersonaje()
  {
    console.log("PASANDO-------------------")
    this.favoritoContadorArray.forEach(element => {
      console.log("COMPARANDO")
      if(element.character.name == this.characterRev.name)
      {
         this.cantidaddefavoritosporpersonaje=element.cont
         this.cantidadFavoritoskey=element.$key
        }
    });
  }
}
