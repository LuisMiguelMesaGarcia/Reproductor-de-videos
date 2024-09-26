namespace ApiReproductorVideos.Models.Domain
{
    public enum Format
    {
        jpeg,
        //etc,
    }
    public class ContentImage:Content
    {
        public int pathImage { get; set; }//ruta iamgen
        public Format MyProperty { get; set; }
    }
}
