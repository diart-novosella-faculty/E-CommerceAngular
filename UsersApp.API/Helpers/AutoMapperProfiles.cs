using AutoMapper;
using UsersApp.API.DTO;
using UsersApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<UserForRegistrationDto, User>();
            CreateMap<User, UserForListDto>();
            CreateMap<UserForUpdateDTO, User>();
        }

    }
}