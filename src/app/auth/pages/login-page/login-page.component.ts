import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

import Swal from 'sweetalert2'
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  private authService : AuthService = inject( AuthService );
  private router      : Router      = inject( Router );

  public loginForm : FormGroup | any;


  constructor(
    private fb : FormBuilder
  ) {}

  ngOnInit() : void {

    this.loginForm = this.fb.group({
      email    : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() : void {

    const { email, password } = this.loginForm.value;

    this.authService.loginUser( email, password )
      .subscribe( {

        next: () => this.router.navigateByUrl('/dashboard'),

        error: (message) => {

          Swal.fire('Error', message, 'error');
        }
      });
  }

}
