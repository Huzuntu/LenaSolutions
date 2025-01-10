using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using backend.Services;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserService _userService;
        private readonly UserManager<User> _userManager;

        public AccountController(UserService userService, UserManager<User> userManager)
        {
            this._userManager = userManager;
            this._userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.LoginRequest model)
        {
            var (token, userId) = await _userService.AuthenticateUserAsync(model.username, model.password);

            if (token != null && userId != null)
            {
                return Ok(new { token, userId });
            }

            return BadRequest(new { message = "Invalid login attempt." });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            var user = new User { UserName = model.Email, PasswordHash = model.Password };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }

    }
}