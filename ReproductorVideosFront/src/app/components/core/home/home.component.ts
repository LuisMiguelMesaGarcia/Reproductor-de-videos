import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  videoPlaying:any;
  videoQueue :object[] = [];
  isPlaying:boolean = false;
  constructor(private api: ApiService){

  }

  ngOnInit(){
    // this.videoPlaying={filePath: "WhatsApp Video 2024-09-20 at 9.18.53 PM_faeadd70-75cf-40ea-8e9b-ac6a589acec0.mp4"};
    this.startScheduler();
  }

  // checkNewVideo(){
  //   let newVideos = this.fetchNewVideos() 
  //   if(newVideos.length>0){
  //     this.videoQueue.push(...newVideos)
  //   }    
  // }

  fetchNewVideos() {
    // Llamada a la API para obtener los videos con la hora actual
    this.api.getVideosByCurrentTime().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.videoQueue.push(...res); // Agregar los videos al videoQueue
          this.playNextVideo();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  playNextVideo(){
    if (!this.isPlaying && this.videoQueue.length > 0) {
      let video:any = this.videoQueue.shift();
      this.isPlaying = true;
      this.videoPlaying  = video;
      console.log(`Reproduciendo: ${video.title}`);
      setTimeout(() => {
          console.log(`Finalizó: ${video.title}`);
          this.videoPlaying=null;
          this.isPlaying = false;
          this.playNextVideo(); // Llamar para el próximo video
      }, video.duration); // aqui ponemos la duracion del banner
    }
  }
  
  startScheduler() {
    console.log("primera ejecucion");
    
    if (!this.isPlaying) {
      this.fetchNewVideos();
      
    }
    setInterval(() => {
      console.log("ejecutamos");
      
      this.fetchNewVideos();
        if (!this.isPlaying) {
            this.playNextVideo();
        }
    }, 60 * 1000); // Verificar cada minuto
  }


}
