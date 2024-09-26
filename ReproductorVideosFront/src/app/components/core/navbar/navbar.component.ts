import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user?: any;
  
  constructor(private api : ApiService, private router: Router){}
  local:any;
  ngOnInit(){
    this.api.user().subscribe({
      next:(response)=>{
        this.user=response;      
      }
    })


    this.user = this.api.getUser();    
  }

  onLogout(){
    this.api.logout();
    this.router.navigateByUrl('/');
  }


}
