﻿using Microsoft.AspNetCore.Identity;

namespace ApiReproductorVideos.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
