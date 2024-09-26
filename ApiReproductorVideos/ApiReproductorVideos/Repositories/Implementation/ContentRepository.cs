using ApiReproductorVideos.Data;
using ApiReproductorVideos.Models.Domain;
using ApiReproductorVideos.Models.Dto;
using ApiReproductorVideos.Repositories.Interface;
using ApiReproductorVideos.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;

namespace ApiReproductorVideos.Repositories.Implementation
{
    public class ContentRepository : IContentRepository
    {

        private readonly AppDbContext _context;
        private readonly FileService _fileService;

        public ContentRepository(AppDbContext context, FileService fileService)
        {
            _context = context;
            this._fileService = fileService;
        }


        public async Task<IEnumerable<Content>> GetContentByCategoryAsync(string category)
        {
            return await _context.Contents.Where(x => x.ContentCategory == category).ToListAsync();
        }

        public async Task<Content> GetContentByIdAsync(int id)
        {
            return await _context.Contents.FindAsync(id);
        }
        public async Task<IEnumerable<Content>> GetContentByCurrentTimeAsync()
        {
            var currentTime = DateTime.Now.ToString("HH:mm");

            // filtrar los contenidos donde PlayStartTime coincida con la hora actual
            return await _context.Contents.Where(c => c.PlayStartTime == currentTime).ToListAsync();
        }


        public async Task<Content> CreateContentAsync(CreateRequestDto requestDto)
        {
            var content = new Content
            {
                Title = requestDto.Title,
                ContentCategory = requestDto.ContentCategory,
                SideBannertext = requestDto.SideBannerText,
                Duration = requestDto.Duration,
                PlayStartTime = requestDto.PlayStartTime,
            };

            if (requestDto.videoFile != null)
            {
                content.FilePath = await _fileService.SaveFileAsync(requestDto.videoFile);
            }

            if (requestDto.imageFile != null)
            {
                content.SideBannerImage = await _fileService.SaveFileAsync(requestDto.imageFile);
            }

            await _context.Contents.AddAsync(content);
            await _context.SaveChangesAsync();

            return content;
        }

        public async Task<Content> UpdateContentAsync(int id, UpdateRequestDto requestDto)
        {
            var content = await _context.Contents.FindAsync(id);
            if (content == null)
            {
                return null;
            }

            content.Title = requestDto.Title;
            content.ContentCategory = requestDto.ContentCategory;
            content.SideBannertext = requestDto.SideBannerText;
            content.Duration = requestDto.Duration;
            content.PlayStartTime = requestDto.PlayStartTime;


            if (requestDto.videoFile != null)
            {
                _fileService.DeleteFile(content.FilePath);
                content.FilePath = await _fileService.SaveFileAsync(requestDto.videoFile);
            }

            if (requestDto.imageFile != null)
            {
                _fileService.DeleteFile(content.SideBannerImage);
                content.SideBannerImage = await _fileService.SaveFileAsync(requestDto.imageFile);
            }

            _context.Contents.Update(content);
            await _context.SaveChangesAsync();

            return content;
        }

        public async Task<bool> DeleteContentAsync(int id) 
        {
            var content = await _context.Contents.FindAsync(id);
            if (content == null)
            {
                return false;
            }

            if (!string.IsNullOrEmpty(content.FilePath))
            {
                _fileService.DeleteFile(content.FilePath);
            }

            if (!string.IsNullOrEmpty(content.SideBannerImage))
            {
                _fileService.DeleteFile(content.SideBannerImage);
            }


            _context.Contents.Remove(content);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
