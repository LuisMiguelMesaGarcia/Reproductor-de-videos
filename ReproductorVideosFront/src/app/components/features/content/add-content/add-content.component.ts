import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.css'
})
export class AddContentComponent {
  requestForm:FormGroup = new FormGroup({});
  videoFile!: File ;
  imageFile!: File ;
  imageUrl: string = "";
  videoUrl: string = "";
  duration: any;

  user?: any;
  token:any;


  constructor(private uploadService: ApiService, private router: Router){
    
  }
  
  ngOnInit(){
    this.token =  localStorage.getItem('token')
    this.user = this.uploadService.getUser();
    
    if(!this.user !== undefined && this.user?.roles?.includes('Writer')){
      console.log("hola que buscas? ._.");
    }else{
      this.router.navigate([''])
    }

    this.requestForm = new FormGroup({
      Title: new FormControl('', Validators.required),
      ContentCategory: new FormControl('',Validators.required),
      SideBannerText: new FormControl(''),
      Hours: new FormControl(''),
      Minutes:new FormControl(''),
      Seconds:new FormControl(''),
      PlayStartTime:new FormControl('')
    });
  }

  getDurationInMs(): number {
    const hours = this.requestForm.value.Hours * 3600 * 1000;
    const minutes = this.requestForm.value.Minutes * 60 * 1000;
    const seconds = this.requestForm.value.Seconds * 1000;
    console.log(this.duration);
    
    return hours + minutes + seconds+this.duration;
  }

  
  handleVideoFileInput(event: any):void{
    this.videoFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.videoUrl = reader.result as string;
  
      // Crear un elemento de video temporal
      const videoElement = document.createElement('video');
      videoElement.src = this.videoUrl;
  
      // Esperar a que el metadato del video esté disponible
      videoElement.onloadedmetadata = () => {
        this.duration = Math.ceil(videoElement.duration)*1000; // Captura la duración en segundos
        console.log(`Duración del video: ${this.duration} segundos`);
      };
    };
    reader.readAsDataURL(this.videoFile) 
  }
  
  handleImageFileInput(event:any):void{
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () =>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.imageFile)    
  }

  
  onSubmit(){

    if(this.requestForm.valid){
      
      
      const formData = new FormData();

      this.duration = this.getDurationInMs().toString();
      if(this.duration != '0'){
        console.log(this.duration);
        formData.append('Duration',this.duration);
      }else{
        formData.append('Duration','');
      }
    
      //agregar los datos del formulario
      formData.append('Title', this.requestForm.get('Title')?.value);
      formData.append('ContentCategory', this.requestForm.get('ContentCategory')?.value);
      formData.append('PlayStartTime', this.requestForm.get('PlayStartTime')?.value);
      formData.append('SideBannerText', this.requestForm.get('SideBannerText')?.value || '');

      if(this.videoFile){
        formData.append('videoFile', this.videoFile)
      }

      if(this.imageFile){
        formData.append('imageFile', this.imageFile)
      }

      console.log("Datos a enviar:", {
        Title: this.requestForm.get('Title')?.value,
        ContentCategory: this.requestForm.get('ContentCategory')?.value,
        SideBannerText: this.requestForm.get('SideBannerText')?.value,
        Duration: this.duration,
        PlayStartTime: this.requestForm.get('PlayStartTime')?.value,
      });

      //llamar al servicio para enviar la solicitud
      this.uploadService.postContent(formData,this.token).subscribe({
        next: (res)=>{
          //redireccionar
          alert("Creado exitosamente")
          this.router.navigate([''])
        },
        error:(error)=>{
          console.log('Error al crear el contenido', error);
          
        }
      })

    }else{
      console.log("formulario invalido");
      
    }    
    
  }
  
}
