import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.scss']
})
export class PaginacionComponent implements OnInit {

  @Input() url_next: string;
  @Input() url_previous: string;
  @Output() avisador = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }
  next( ): void {
    this.avisador.emit(this.url_next)
    //this.callNewPage(url)
  }
  
  previous(): void {
    this.avisador.emit(this.url_previous)
    //  this.callNewPage(url)
  }
}
