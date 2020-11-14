import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/apiresponse';
import { Character } from 'src/app/models/character';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  responses: APIResponse ;
  characters: Array<Character> = [];

  constructor(private apiRequests: ApiRequestService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void  {
    this.apiRequests.getAllCharacters().then(response  => {
      console.log(response.data.results);
     
     
      this.characters = response.data.results
      console.log(this.characters);
      
    }).catch(error => {
      console.log("Error!");
    })
  }
  

}
