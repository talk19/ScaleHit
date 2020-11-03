using AutoMapper;
using ScaleHit.API.Dtos;
using ScaleHit.API.Models;

namespace ScaleHit.API.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailesDto>();
            CreateMap<Scale, ScalesForDetailesDto>();
        }
    }
}