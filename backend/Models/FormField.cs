using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class FormField
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Field name is required.")]
        public string Name { get; set; }


        public bool Required { get; set; }

        [Required(ErrorMessage = "Data type is required.")]
        public string DataType { get; set; }  
        
        public int FormId { get; set; }
    }
}