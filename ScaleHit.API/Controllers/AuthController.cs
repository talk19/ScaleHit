using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ScaleHit.API.Data;
using ScaleHit.API.Dtos;
using ScaleHit.API.Models;

namespace ScaleHit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            //method in AuthRepository, acsses via the repository interface called _repo
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("username exist");

            //create new user with username only
            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            //method in AuthRepository that create the user with hashed password
            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //method in AuthRepository, acsses via the repository interface called _repo
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            //if username or password are incorrect
            if (userFromRepo == null)
                return Unauthorized();

            //create the claims that the token will hold
            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),
                new Claim(ClaimTypes.GivenName, userFromRepo.FirstName),
                new Claim(ClaimTypes.Role, userFromRepo.EditorType)
            };

            //get the key that can decode the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            //create the hashed part of the token
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //create the token data
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            //set the type of the token
            var tokenHandler = new JwtSecurityTokenHandler();

            //create the token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //send the token to the user
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }

        [HttpPut("changePassword/{id}")]
        public async Task<IActionResult> UpdatePassword(int id, PasswordForUpdateDto passwordForUpdateDto) {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if(!await _repo.PasswordCorrect(id, passwordForUpdateDto.OldPassword)) 
                return Unauthorized();

            if(await _repo.UpdatePassword(id, passwordForUpdateDto.NewPassword))
                return Ok();

            return BadRequest("saveFail");
        }
    }
}