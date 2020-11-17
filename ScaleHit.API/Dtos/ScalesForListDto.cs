using System;

namespace ScaleHit.API.Dtos
{
    public class ScalesForListDto
    {
         public int Id { get; set; }
        public string ScaleTitle { get; set; }
         public int ScaleCode { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string ScaleStatus { get; set; }
        public bool IsArchive { get; set; }
    }
}