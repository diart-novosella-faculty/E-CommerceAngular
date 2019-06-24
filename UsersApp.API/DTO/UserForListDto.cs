using System;

namespace UsersApp.API.DTO
{
    public class UserForListDto
    {
         public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }

         public string City { get; set; }
        public string Country { get; set; }
    }
}