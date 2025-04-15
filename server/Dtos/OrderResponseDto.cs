using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Dtos
{
    public class OrderResponseDto
    {
        public List<UserDto> DataSource { get; set; } = new List<UserDto>();
        public int Page { get; set; } = 0;
        public int PageSize { get; set; } = 0;
        public int TotalCount { get; set; } = 0;
    }
}