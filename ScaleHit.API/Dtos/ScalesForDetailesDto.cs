using System;

namespace ScaleHit.API.Dtos
{
    public class ScalesForDetailesDto
    {
                public int Id { get; set; }
        public string ScaleTitle { get; set; }
        public string ScaleType { get; set; }
        public string PointsValue { get; set; }
        public string MaxPoint { get; set; }
        public string MinPoint { get; set; }
        public int ScaleCode { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsPublish { get; set; }
        public bool IsLive { get; set; }
        public bool IsLinearNavigation { get; set; }
        public string ScaleTopic { get; set; }
        public bool IsArchive { get; set; }
        public string GradeType { get; set; }
        public string PointsXml { get; set; }
    }
}