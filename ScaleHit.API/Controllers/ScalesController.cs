using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScaleHit.API.Data;
using ScaleHit.API.Dtos;

namespace ScaleHit.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
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
        public async Task<IActionResult> GetScales()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var scales = await _repo.GetScales(userId);

            var scalesToReturn = _mapper.Map<IEnumerable<ScalesForListDto>>(scales);

            return Ok(scalesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScale(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var scale = await _repo.GetScale(id);

            if(scale.Id != userId) {
                return Unauthorized();
            }


            var scaleToReturn = _mapper.Map<ScalesForDetailesDto>(scale);
            return Ok(scaleToReturn);
        }
        
    }
}