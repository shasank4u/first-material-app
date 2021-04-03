import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   logingForm: FormGroup

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.logingForm = new FormGroup({
      email: new FormControl('' , {validators:[Validators.email,Validators.required]}),
      password: new FormControl('' , {validators: [Validators.required]})
    })
  }
  onSubmit() {
    this.authService.login({
      email: this.logingForm.value.email,
      password: this.logingForm.value.password
    });
  }

}
