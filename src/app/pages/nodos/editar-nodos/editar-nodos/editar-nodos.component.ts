import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodosService } from 'src/app/services/nodos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-nodos',
  templateUrl: './editar-nodos.component.html',
  styleUrls: ['./editar-nodos.component.css'],
})
export class EditarNodosComponent implements OnInit {
  public id: any;
  public nodo: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _nodoService: NodosService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this._nodoService.nodo_obtener(this.id).subscribe(
          (response) => {
            if (response == undefined) {
              this.nodo = undefined;
              console.log(this.nodo);
            } else {
              this.nodo = response;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {}
    );
  }

  actualizar(updateForm: any) {
    this._nodoService.nodo_actualizar(this.id, this.nodo).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['/dashboard/nodos']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
