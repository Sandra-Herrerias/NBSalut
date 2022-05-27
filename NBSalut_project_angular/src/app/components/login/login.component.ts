import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string | undefined;

  public loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
      ]
    ]
  });


  constructor(private formBuilder: FormBuilder, private communicatorService: CommunicatorService, private route: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    // console.log({
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password
    // })
    this.communicatorService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe((res: any) => {
      if (res.success) {
        this.route.navigate(['/home']);
      } else {
        if (res.message) {
          this.message = res.message;
        } else {
          this.message = "Credenciales incorrectas.";
        }
      }
    })
  }

}
