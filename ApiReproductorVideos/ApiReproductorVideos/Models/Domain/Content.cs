namespace ApiReproductorVideos.Models.Domain
{
    //tal vez hacer el enum para contentBanner

    public class Content
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? FilePath { get; set; }//ruta del video del banner en el back
        public string? ContentCategory { get; set; }// VT, VBL, BT V=video, B=banner, T= titulo
        public string? SideBannertext { get; set; }
        public string? SideBannerImage { get; set; }//ruta de imagen del banner en el back
        public long? Duration { get; set; }//lo que dura el BT
        public string? PlayStartTime { get; set; }//iniciar el video
    }
}
