import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  public registerForm : FormGroup | any;
  public router : Router = inject( Router );

  constructor(
    private authService : AuthService,
    private fb : FormBuilder
  ) {}

  ngOnInit() {

    this.registerForm = this.fb.group({

      name     : ['', Validators.required],
      email    : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  register() : void {
    this.authService.registerUser( this.registerForm.value )
      .subscribe( {

        next: () => {

          this.router.navigateByUrl('auth/login')

          Swal.fire({
            position          : "top-end",
            icon              : 'success',
            title             : 'Registrado con exito',
            showConfirmButton : false,
            timer             : 2500,
            width             : 400,
            heightAuto        : true,
          })

        },

        error: (message) => {

          Swal.fire('Error', message, 'error');
        }
      })
  }

}
