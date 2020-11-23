using AutoMapper;
using ScaleHit.API.Dtos;
using ScaleHit.API.Models;
using ScaleHit.API.helpers;

namespace ScaleHit.API.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<Src, Dest>();
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailesDto>();
            CreateMap<Scale, ScalesForDetailesDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Scale, ScalesForListDto>();
            CreateMap<ScaleForCreationDto, Scale>();
            CreateMap<Scale, ScaleForReturnDto>();
        }
    }
}