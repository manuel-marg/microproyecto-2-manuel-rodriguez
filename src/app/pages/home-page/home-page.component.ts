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
    
  }).catch(error => {
    console.log("Error!");
  })
}


}
