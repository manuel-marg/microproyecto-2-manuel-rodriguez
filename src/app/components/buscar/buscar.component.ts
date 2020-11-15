import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  busquedaForm: FormGroup;
  urlBusqueda: string;
  @Output() filtrar = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    const dataBusqueda: any = {
      name: this.busquedaForm.get('name').value,
      species: this.busquedaForm.get('species').value,
      type: this.busquedaForm.get('type').value,
      status: this.busquedaForm.get('status').value,
      gender: this.busquedaForm.get('gender').value,
    };
    var query = 0
    var busqname =""
    var busqspecies=""
    var busqtype=""
    var busqstatus=""
    var busqgender=""

    if( dataBusqueda.name != undefined &&  dataBusqueda.name != ""){
      if(query==0)
      {
       busqname ="name="+dataBusqueda.name
       query=query+1
      }else{
        busqname ="&name="+dataBusqueda.name
      }
    }

    if( dataBusqueda.species !== undefined &&  dataBusqueda.species !== ""){
      if(query==0)
      {
        busqspecies ="species="+dataBusqueda.species
       query=query+1
      }else{
        busqspecies ="&species="+dataBusqueda.species
      }
    }

    if( dataBusqueda.type !== undefined &&  dataBusqueda.type !== ""){
      if(query==0)
      {
        busqtype ="type="+dataBusqueda.type
       query=query+1
      }else{
        busqtype ="&type="+dataBusqueda.type
      }
    }

    if( dataBusqueda.status !== "" ){
      if(query==0)
      {
        busqstatus ="status="+dataBusqueda.status
       query=query+1
      }else{
        busqstatus ="&status="+dataBusqueda.status
      }
    }

    if( dataBusqueda.gender !== ""){
      if(query==0)
      {
        busqgender ="gender="+dataBusqueda.gender
       query=query+1
      }else{
        busqgender ="&gender="+dataBusqueda.gender
      }
    }

    if ( query != 0 ) {
    var urlBusqueda = 'https://rickandmortyapi.com/api/character/?' + busqname + busqspecies + busqtype + busqstatus + busqgender
    console.log(urlBusqueda)
    this.filtrar.emit( urlBusqueda )
    }
    
  }

  createForm(): void {

    this.busquedaForm = this.fb.group({
      name: [''],
      species: [''],
      type: [''],
      status: [''],
      gender: [''],
    });
  }



}
