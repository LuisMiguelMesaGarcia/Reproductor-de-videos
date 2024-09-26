import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-content-list-vt',
  standalone: true,
  imports: [],
  templateUrl: './content-list-vt.component.html',
  styleUrl: './content-list-vt.component.css'
})
export class ContentListVtComponent {
  contents:any;
  user?: any;
  token:any;
  constructor(private api:ApiService){ }
  
  ngOnInit(){
    this.token =  localStorage.getItem('token')
    
    //traer datos por medio del servicio de getall
    this.getContent();
    
    this.user = this.api.getUser();
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
        }
      });
    }
  }

  getContent(){
    this.api.getContentsByCategory("VT").subscribe({
      next: (res)=>{
        this.contents = res;
      }
    })
  }
}
