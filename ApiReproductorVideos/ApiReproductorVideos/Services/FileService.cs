namespace ApiReproductorVideos.Services
{
    public class FileService
    {
        private readonly string _storagePath;
        public FileService()
        {
            _storagePath = @"C:\carpetaFiles";
            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }
        }


        public async Task<string> SaveFileAsync(IFormFile file)
        {
            string fileName = Path.GetFileNameWithoutExtension(file.FileName) + "_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(_storagePath, fileName);

            //crear el archivo en el path
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        // metodo para eliminar un archivo existente
        public bool DeleteFile(string fileName)
        {
            string filePath = Path.Combine(_storagePath, fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            return false;
        }

    }
}
