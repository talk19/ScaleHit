using System;
using System.Collections.Generic;
using ScaleHit.API.Models;

namespace ScaleHit.API.Dtos
{
    public class UserForDetailesDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EditorType { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string Organization { get; set; }
        public DateTime RegisterTime { get; set; }
        public DateTime LastEnter { get; set; }
        public DateTime PlanStarted { get; set; }
        public ICollection<ScalesForDetailesDto> Scales { get; set; }
    }
}