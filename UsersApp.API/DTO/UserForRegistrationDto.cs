using System;
using System.ComponentModel.DataAnnotations;
using UsersApp.API.Models;
namespace UsersApp.API.DTO
{
    public class UserForRegistrationDto
    {
        public string Email;
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify passsowrd between 4 and 8")]
        public string Password;
        [Required]
        public string Username { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public DateTime Created { get; set; }
        public string Role {get; set;}

        public UserForRegistrationDto()
        {
            Created = DateTime.Now;
            Role = UsersApp.API.Models.Role.User;
        }


    }
}