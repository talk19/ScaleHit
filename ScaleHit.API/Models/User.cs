using System;
using System.Collections.Generic;

namespace ScaleHit.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EditorType { get; set; }
        public string Status { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string Organization { get; set; }
        public DateTime RegisterTime { get; set; }
        public DateTime LastEnter { get; set; }
        public DateTime PlanStarted { get; set; }
        public DateTime PlanExpired { get; set; }
        public ICollection<Scale> Scales { get; set; }
    }
}