using System.ComponentModel.DataAnnotations;

namespace ScaleHit.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "4-8 password")]
        public string Password { get; set; }
    }
}