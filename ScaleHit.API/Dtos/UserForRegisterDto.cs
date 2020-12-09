using System;
using System.ComponentModel.DataAnnotations;

namespace ScaleHit.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(64, MinimumLength = 6, ErrorMessage = "6-64 password")]
        public string Password { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        public string Organization { get; set; }

        [Required]
        public string Phone { get; set; }
        public DateTime RegisterTime { get; set; }
        public string Status { get; set; }
        public string EditorType { get; set; }
        public UserForRegisterDto()
        {
            RegisterTime = DateTime.Now;
            Status = "mailPending";
        }
    }
}