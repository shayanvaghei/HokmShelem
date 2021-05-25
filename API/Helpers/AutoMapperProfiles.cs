using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using System.Linq;

namespace API.Helpers
{
    // derives from Profile class from AutoMapper
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // <wehere we want to map from, where we want to map to>
            CreateMap<AppUser, MemberDto>()
                // in order to retrieve the photoUrl we add some extra steps here
                // ForMemeber means which property do we want to effec
                // this will populate the dest based on the options
                // in the option we MapFrom all the photos assigned to that user and search if for that photo record IsMain is true. if so then we
                // want that Url of that record
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoDto>().ReverseMap();
            CreateMap<AppUser, UserUpdateDto>().ReverseMap();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}
