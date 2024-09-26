using ApiReproductorVideos.Models.Domain;
using ApiReproductorVideos.Models.Dto;

namespace ApiReproductorVideos.Repositories.Interface
{
    public interface IContentRepository
    {
        Task<Content> UpdateContentAsync(int id, UpdateRequestDto requestDto);
        Task<IEnumerable<Content>> GetContentByCategoryAsync(string category);
        Task<Content> GetContentByIdAsync(int id);
        Task<Content> CreateContentAsync(CreateRequestDto requestDto);
        Task<bool> DeleteContentAsync(int id);
        Task<IEnumerable<Content>> GetContentByCurrentTimeAsync();
    }
}
