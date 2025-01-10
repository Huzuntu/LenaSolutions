using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly string _jwtSecretKey = "3LKk93BJzOMCdzuWzUZA5dMjU+f4VOWH/I7rhi+iUA9CJaDRxfq8l5Z+QsnJyjqckT9JkAAx+wfKy7W7Bltb4g=="; 

        public UserService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateUserAsync(User user, string plainPassword)
        {
            return await _userManager.CreateAsync(user, plainPassword);
        }

        public async Task<Microsoft.AspNetCore.Identity.SignInResult> ValidateUserLoginAsync(string username, string plainPassword)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return Microsoft.AspNetCore.Identity.SignInResult.Failed;

            return await _signInManager.PasswordSignInAsync(user, plainPassword, false, false);
        }

        public async Task<User> FindUserByNameAsync(string username)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<(string token, string userId)> AuthenticateUserAsync(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, password)))
            {
                return (null, null);
            }

            var token = GenerateJwtToken(user);

            return (token, user.Id);
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSecretKey = _jwtSecretKey;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}