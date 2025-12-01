using Backend.Application.Interfaces;
using Backend.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthService(UserManager<AppUser> userManager,
                           SignInManager<AppUser> signInManager,
                           RoleManager<IdentityRole> roleManager,
                           IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
        }

        public async Task<AuthResultDto> LoginAsync(LoginRequestDto login)
        {
            var user = await _userManager.FindByNameAsync(login.Username);
            if (user == null) return new AuthResultDto { Success = false, Errors = new[] { "Invalid credentials" } };

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);
            if (!result.Succeeded) return new AuthResultDto { Success = false, Errors = new[] { "Invalid credentials" } };

            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles);

            return new AuthResultDto
            {
                Success = true,
                Token = token,
                Role = roles.FirstOrDefault() ?? "User",
                Username = user.UserName
            };
        }

        public async Task<RegisterResultDto> RegisterAsync(RegisterRequestDto register, string role = "User")
        {
            var user = new AppUser
            {
                UserName = register.Username,
                Email = register.Email,
                FullName = register.FullName
            };

            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
                return new RegisterResultDto { Success = false, Errors = result.Errors.Select(e => e.Description).ToArray() };

            // assign role
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
            await _userManager.AddToRoleAsync(user, role);

            return new RegisterResultDto { Success = true };
        }

        private string GenerateJwtToken(AppUser user, IList<string> roles)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName ?? ""),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            // Add roles as claims
            foreach (var r in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, r));
            }

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryMinutes"] ?? "60")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
