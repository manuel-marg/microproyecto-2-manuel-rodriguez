import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  showtable: boolean;
  @Input() character: Character;
  @Output() back = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  volver(): void {
    this.back.emit()
  }

}
