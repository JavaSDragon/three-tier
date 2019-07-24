import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  public userLogin: any = {};
  public userForm: any;
  public submitted: Boolean = false;
  public regErr: Boolean;
  constructor(private router: Router, public AuthService: AuthService, private formBulder: FormBuilder) { }

  ngOnInit() {
    this.regErr = false;
    this.userForm = this.formBulder.group({
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

  public reg(): any {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const user = { name: this.form.name.value, password: this.form.password.value };
    this.AuthService.regUser(user).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('signedUser', res.signedUser);
      this.router.navigate(['/records']);
    },
      (err) => {
        this.regErr = true;
      });
  }

  public get form() {
    return this.userForm.controls
  }
}
