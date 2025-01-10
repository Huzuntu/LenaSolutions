using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Form
    {
        public int Id { get; set; }


        [Required(ErrorMessage = "Form name is required.")]
        public string Name { get; set; } 
        
        [Required(ErrorMessage = "Form description is required.")]
        public string Description { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public List<FormField> Fields { get; set; }
    }
}