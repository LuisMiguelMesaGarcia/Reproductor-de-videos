using ApiReproductorVideos.Data;
using ApiReproductorVideos.Models.Domain;
using ApiReproductorVideos.Models.Dto;
using ApiReproductorVideos.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiReproductorVideos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly IContentRepository _contentRepository;

        public ContentController(AppDbContext context, IContentRepository contentRepository)
        {
            this._contentRepository = contentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetAllContent([FromQuery] string category)
        {
            if (string.IsNullOrEmpty(category)) 
            {
                return BadRequest("Categoria es requerida");
            }

            var contents = await _contentRepository.GetContentByCategoryAsync(category);

            if(contents == null || !contents.Any()) 
            {
                return NotFound("No se encontró contenido en esta categoria");
            }
            return Ok(contents);
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = "Reader")]
        public async Task<ActionResult<Content>> GetContentById (int id)
        { 
            var content = await _contentRepository.GetContentByIdAsync(id);
            if(content == null) 
            {
                return NotFound("No se encontro contenido");
            }
            return Ok(content);
        }

        [HttpGet("current")]
        public async Task<ActionResult<IEnumerable<Content>>> GetContentByCurrentTime()
        {
            var contents = await _contentRepository.GetContentByCurrentTimeAsync();

            if (contents == null || !contents.Any())
            {
                return Ok(new List<Content>());
            }

            return Ok(contents);
        }

        [HttpPost]
        [Route("upload")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateContent([FromForm] CreateRequestDto requestDto)
        {
            var content = await _contentRepository.CreateContentAsync(requestDto);
            return Ok(content);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> UpdateContent(int id, [FromForm] UpdateRequestDto requestDto) 
        {
            var updatedContent = await _contentRepository.UpdateContentAsync(id, requestDto);
            if (updatedContent == null) 
            {
                return BadRequest("Categoria es requerida");
            }
            return Ok(updatedContent);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteContent(int id)
        {
            var result = await _contentRepository.DeleteContentAsync(id);
            if (!result)
            {
                return NotFound("No se encontró contenido");
            }

            return NoContent(); 
        }

    }
}
