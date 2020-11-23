using System;

namespace ScaleHit.API.Dtos
{
    public class ScaleForCreationDto
    {
        public string ScaleTitle { get; set; }
        public string ScaleType { get; set; }
        public string PointsValue { get; set; }
        public int ScaleCode { get; set; }
        public string MaxPoint { get; set; }
        public string MinPoint { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string ScaleStatus { get; set; }
        public bool IsLinearNavigation { get; set; }
        public string ScaleTopic { get; set; }
        public string GradeType { get; set; }

        public ScaleForCreationDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
            ScaleStatus = "notActive";
        }
    }
}