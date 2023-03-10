import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router'
import { Observable } from 'rxjs';
import { ClientsService } from 'src/app/clients.service';
import { Client } from '../client';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  client:Client;
  sucess:boolean = false;
  errors:String[];
  id:number;


  constructor(private service:ClientsService,private router:Router,private activatedRoute:ActivatedRoute ) {
  this.client =  new Client();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
      params.subscribe(urlParams =>{
      this.id = urlParams['id'];
      if(this.id){
        this.service.getClientById(this.id)
      .subscribe(response => this.client = response,
      errorResponse => this.client = new Client()
        )
      }  
    })
  }

  onSubmit() {
    if (this.id) {
      this.service.update(this.client)
      .subscribe(response => {
        this.sucess = true;
        this.errors = null;
      }, errorResponse => {
        this.errors = ['Erro ao atualizar o cliente'];
      });
    } else {
      this.service.save(this.client)
      .subscribe(response => {
        this.sucess = true;
        this.errors = null;
        this.client = response;
        console.log(this.client)
      }, errorResponse => {
        this.sucess = false;
        this.errors = errorResponse.error.errors;
      });
    }
  }
  

  backClientsList(){
    this.router.navigate(['/clients-list'])
  }

}
