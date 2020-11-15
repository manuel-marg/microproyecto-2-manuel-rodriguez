import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { APIResponse } from 'src/app/models/apiresponse';
import { Character } from 'src/app/models/character';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  selected: Character;
  showtable:boolean = true
  url_next: string;
  url_previous: string;
  characters: Array<Character> = [];

  constructor(private apiRequests: ApiRequestService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void  {
    this.apiRequests.getAllCharacters().then(response  => {
      this.characters = response.data.results
      this.url_next = response.data.info.next;
      this.url_previous = response.data.info.prev;
    }).catch(error => {
      console.log("Error!");
    })
  }

  callNewPage(url)
{
  this.apiRequests.getAllCharactersPages(url).then(response  => {
    this.characters=[]
    this.characters = response.data.results
    this.url_next = response.data.info.next;
    this.url_previous = response.data.info.prev;
    console.log("Ejecuando funcion next()");
    let audio = new Audio();
    audio.src = "../../../assets/sounds/mensaje_busqueda.mp3";
    audio.load();
    audio.play();
    
  }).catch(error => {
    let audio = new Audio();
    audio.src = "../../../assets/sounds/mensaje_no_resultados.mp3";
    audio.load();
    audio.play();
  })
}

characterSelected( characterRecived: Character) {
  this.selected = characterRecived;
  console.log(this.selected)
  this.showtable = false;
}

back(){
  this.showtable = true;
}


filtrar(urlBusqueda){
 console.log("ESTE ES EL URL EN LA CLASE PADRE: "+urlBusqueda)
 this.callNewPage(urlBusqueda)
}

}
