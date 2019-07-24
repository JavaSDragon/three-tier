import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public userForm: any;
  public submitted: Boolean = false;
  public loginErr: Boolean = false;
  constructor(public AuthService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.pattern(/^[A-z]*$/)]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)]
      ]
    });
  }

  public logIn(): any {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const user = { name: this.form.name.value, password: this.form.password.value };
    this.AuthService.login(user).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('signedUser', res.signedUser);
      this.router.navigate(['/records']);
    },
      (err) => {
        this.loginErr = true;
      });

  }

  public reg(): any {
    this.loginErr = false;
    this.router.navigate(['/reg']);
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('signedUser');
  }

  public goBack() {
    this.router.navigate(['/records']);
  }

  public get form() {
    return this.userForm.controls;
  }

  public get userName(): String {
    return (localStorage.getItem('signedUser'));
  }
}

