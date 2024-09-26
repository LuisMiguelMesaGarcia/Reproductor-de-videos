import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-content',
  standalone: true,
  imports: [],
  templateUrl: './view-content.component.html',
  styleUrl: './view-content.component.css'
})
export class ViewContentComponent {
  idParam:string="";
  content:any;

  constructor(private api:ApiService,private route: ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idParam = params['id'];
    });

    this.getContent();
  }

  getContent(){
    this.api.getContentsById(this.idParam).subscribe({
      next: (res)=>{
        this.content = res;
        console.log(this.content);
      }
    })
  }

}
