using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Dtos;
using server.Models;

namespace server.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();
            CreateMap<Role, RoleDto>();
            CreateMap<UserPermission, UserPermissionDto>();
            CreateMap<Permission, PermissionDto>();
            CreateMap<Permission, ResponsePermissionDto>();
        }
    }
}