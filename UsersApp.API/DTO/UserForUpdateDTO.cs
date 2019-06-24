using System;

namespace UsersApp.API.DTO
{
    public class UserForUpdateDTO
    {
     
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}