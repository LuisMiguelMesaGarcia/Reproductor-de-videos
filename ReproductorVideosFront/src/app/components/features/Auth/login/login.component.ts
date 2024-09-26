import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  requestForm:FormGroup = new FormGroup({});

  constructor(private api: ApiService,private router: Router){
    // , private cookieService: CookieService 
  }


  ngOnInit(){
    this.requestForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
    });
  }

  onSubmit(){
    this.api.login(this.requestForm.value)
    .subscribe({
      next: (res) => {
        //Set Auth
        localStorage.setItem('token', `Bearer ${res.token}`);
        

        // set de user
        this.api.setUser({
          email:res.email,
          roles:res.roles
        })

        // Redirect back to Home
          this.router.navigateByUrl('/')
      }
    });
  }
}
