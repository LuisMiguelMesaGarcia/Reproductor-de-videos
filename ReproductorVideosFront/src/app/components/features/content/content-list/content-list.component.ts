import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent {

  contents:any;
  constructor(private api:ApiService){ }
  user?: any;
  token:any;
  
  ngOnInit(){
    this.token =  localStorage.getItem('token')
    this.user = this.api.getUser();
    //traer datos por medio del servicio de getall
    this.getContent();
  }

  deleteContent(id:any){
    if (confirm("¿Estás seguro de que deseas eliminar este contenido?")) {
      this.api.deleteContent(id, this.token).subscribe({
        next: (response) => {
          alert("Contenido eliminado exitosamente");
          this.getContent();
          // Aquí puedes actualizar tu lista de contenidos o redireccionar
        },
        error: (error) => {
          console.error('Error al eliminar el contenido', error);
          alert("Error al eliminar el contenido");
          this.contents={};
        }
      });
    }
  }

  getContent(){
    this.api.getContentsByCategory("VBL").subscribe({
      next: (res)=>{
        this.contents = res;
      }
    })
  }

}
