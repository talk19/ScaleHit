using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScaleHit.API.Data;
using ScaleHit.API.Dtos;
using ScaleHit.API.Models;

namespace ScaleHit.API.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class ScalesController : ControllerBase
    {
        private readonly IScalesRepository _repo;
        private readonly IMapper _mapper;
        public ScalesController(IScalesRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetScales(int userId)
        {
            //int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var scales = await _repo.GetScales(userId);

            var scalesToReturn = _mapper.Map<IEnumerable<ScalesForListDto>>(scales);

            return Ok(scalesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScale(int userId, int id)
        {
            //int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            if(!userFromRepo.Scales.Any(s => s.Id == id))
                return Unauthorized();
            
            
            var scale = await _repo.GetScale(id);

            //if (scale.UserId != userId)
            //{
                //return Unauthorized();
            //}


            var scaleToReturn = _mapper.Map<ScalesForDetailesDto>(scale);
            return Ok(scaleToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddScale(int userId, ScaleForCreationDto scaleForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var scale = _mapper.Map<Scale>(scaleForCreationDto);

            userFromRepo.Scales.Add(scale);

            if (await _repo.SaveAll())
            {

                //scale.ScaleCode = scale.Id + 1000;
                var scaleFromRepo = await _repo.GetScale(scale.Id);
                scaleFromRepo.ScaleCode = scaleFromRepo.Id + 1000;

                if (await _repo.SaveAll())
                {
                    var scaleToReturn = _mapper.Map<ScaleForReturnDto>(scaleFromRepo);

                    return CreatedAtRoute(new { userId = userId, id = scale.Id }, scaleToReturn);
                }

                return BadRequest("scale code fail");
            }

            return BadRequest("scale creation fail");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScale(int userId, int id) {
             if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            if(!userFromRepo.Scales.Any(s => s.Id == id))
                return Unauthorized();
                       
            var scale = await _repo.GetScale(id);

            _repo.Delete(scale);
            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("fail to delete scale");
        }
    }
}