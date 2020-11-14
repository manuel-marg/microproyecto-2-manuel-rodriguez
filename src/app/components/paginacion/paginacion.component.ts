import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.scss']
})
export class PaginacionComponent implements OnInit {

  @Input() url_next: string;
  @Input() url_previous: string;
  @Output() onClick = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }
  next( url:string): void {
    this.onClick.emit(url)
    //this.callNewPage(url)
  }
  
  previous(url:string): void {
    this.onClick.emit(url)
    //  this.callNewPage(url)
  }
}
