namespace ApiReproductorVideos.Models.Dto
{
    public class UpdateRequestDto
    {
        public string Title { get; set; }
        public string ContentCategory { get; set; }
        public string? SideBannerText { get; set; }
        public long? Duration { get; set; }
        public string? PlayStartTime { get; set; }
        public IFormFile? videoFile { get; set; }
        public IFormFile? imageFile { get; set; }
    }
}
