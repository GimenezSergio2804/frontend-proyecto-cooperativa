import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalleService } from 'src/app/services/calle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-calle',
  templateUrl: './editar-calle.component.html',
  styleUrls: ['./editar-calle.component.css'],
})
export class EditarCalleComponent implements OnInit {
  public id: any;
  public calle: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _calleService: CalleService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this._calleService.calle_obtener(this.id).subscribe(
          (response) => {
            if (response == undefined) {
              this.calle = undefined;
              console.log(this.calle);
            } else {
              this.calle = response;
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
    this._calleService.calle_actualizar(this.id, this.calle).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['/dashboard/calles']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
