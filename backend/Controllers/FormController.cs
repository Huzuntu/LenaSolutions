using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase
    {
        private readonly FormService _formService;

        public FormController(FormService formService)
        {
            _formService = formService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetForms()
        {
            List<Form> forms = await _formService.GetFormsAsync();
            return Ok(forms);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateForm([FromBody] Form form)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var createdForm = await _formService.CreateFormAsync(form);
                    return Ok(new { success = true, form = createdForm });
                }
                catch (UnauthorizedAccessException)
                {
                    return Unauthorized(new { success = false, message = "User is not logged in." });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { success = false, message = "An error occurred.", error = ex.Message });
                }
            }

            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(new { success = false, errors = errors });
        }
        
        [HttpGet("view/{id}")]
        public async Task<IActionResult> GetFormById(int id)
        {
            Form form = await _formService.GetFormByIdAsync(id);
            if (form == null) return NotFound();
            return Ok(form); 
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            var result = await _formService.DeleteFormAsync(id);

            if (!result)
            {
                return NotFound(new { message = "Form not found" });
            }

            return Ok(new { message = "Form deleted successfully" });
        }
    }
}