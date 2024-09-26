import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-content',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './update-content.component.html',
  styleUrl: './update-content.component.css'
})
export class UpdateContentComponent {
  requestForm:FormGroup = new FormGroup({});
  videoFile!: File ;
  imageFile!: File ;
  imageUrl: string = "";
  videoUrl: string = "";
  duration: any;
  idContent: string = "";
  data:any = "";
  token:any;
  user?: any;
  
  
 
  constructor(private uploadService: ApiService, private router: Router,private route: ActivatedRoute){}

  ngOnInit(){
    this.token =  localStorage.getItem('token')
    
    
    this.user = this.uploadService.getUser();
    
    if(!this.user !== undefined && this.user?.roles?.includes('Writer')){
    }else{
      this.router.navigate([''])
    }


    this.route.params.subscribe(params => {
      // Acceder a los parámetros específicos
      this.idContent = params['id'];
    });

    this.requestForm = new FormGroup({
      Title: new FormControl('', Validators.required),
      ContentCategory: new FormControl('',Validators.required),
      SideBannerText: new FormControl(''),
      Hours: new FormControl(''),
      Minutes:new FormControl(''),
      Seconds:new FormControl(''),
      PlayStartTime:new FormControl('')
    });

    this.getData();
  }

  getData(){
    this.uploadService.getContentsById(this.idContent).subscribe({
      next: (res) => {
        this.data = res;
  
        // Actualizar los valores en el formulario con los datos recibidos
        this.requestForm.patchValue({
          Title: this.data.title,
          ContentCategory: this.data.contentCategory,
          SideBannerText: this.data.sideBannertext,
          PlayStartTime: this.data.playStartTime
        });
  
        
        // Convertir la duración recibida a horas, minutos y segundos
        const totalSeconds = Math.floor(this.data.duration / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Actualizar los campos de duración
        this.requestForm.patchValue({
          Hours: hours,
          Minutes: minutes,
          Seconds: seconds
        });
        
        
      },
      error: (error) => {
        console.log('Error al obtener los datos', error);
      }
    });
  }

  getDurationInMs(): number {
    if(this.duration > 0 && this.duration){
      return this.duration;
    }else{
      const hours = this.requestForm.value.Hours * 3600 * 1000;
      const minutes = this.requestForm.value.Minutes * 60 * 1000;
      const seconds = this.requestForm.value.Seconds * 1000;
      return hours + minutes + seconds;
    }
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

        
        formData.append('Duration',this.duration);
      }else{
        formData.append('Duration','');
      }
    
      //agregar los datos del formulario
      formData.append('Title', this.requestForm.get('Title')?.value);
      formData.append('ContentCategory', this.requestForm.get('ContentCategory')?.value);
      formData.append('PlayStartTime', this.requestForm.get('PlayStartTime')?.value);
      formData.append('SideBannerText', this.requestForm.get('SideBannerText')?.value || '');

      if(this.videoFile && this.videoFile !== undefined){
        formData.append('videoFile', this.videoFile)
      }

      if(this.imageFile && this.imageFile !== undefined){
        formData.append('imageFile', this.imageFile)
      }

      this.uploadService.updateContent(this.idContent,formData,this.token).subscribe({
        next: (res)=>{
          alert("Actualizado exitosamente")
          this.router.navigate([''])
        },
        error:(error)=>{
          console.log('Error al actualizar el contenido', error);
          
        }
      })

    }else{
      console.log("formulario invalido");
      
    }
  }

}
