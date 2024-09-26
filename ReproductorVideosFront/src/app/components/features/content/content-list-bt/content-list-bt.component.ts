import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-content-list-bt',
  standalone: true,
  imports: [],
  templateUrl: './content-list-bt.component.html',
  styleUrl: './content-list-bt.component.css'
})
export class ContentListBtComponent {
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

  deleteContent(id: any) {
    if (confirm("¿Estás seguro de que deseas eliminar este contenido?")) {
      this.api.deleteContent(id,this.token).subscribe({
        next: (response) => {
          alert("Contenido eliminado exitosamente");
          // Actualizar la lista de contenidos o redireccionar aquí
          this.getContent();
        },
        error: (error) => {
          if (error.status !== 204) {
            console.error('Error al eliminar el contenido', error);
            alert("Error al eliminar el contenido");
          }
        }
      });
    }
  }

  getContent(){
    this.api.getContentsByCategory("BT").subscribe({
      next: (res)=>{
        this.contents = res;
      }
    })
  }
}
