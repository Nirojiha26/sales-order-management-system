using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Backend.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto login)
        {
            var result = await _authService.LoginAsync(login);
            if (!result.Success) return Unauthorized(result);
            return Ok(result);
        }

        // Admin-only: create other users (or public registration if you prefer)
        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto register)
        {
            var result = await _authService.RegisterAsync(register, "User"); //  default register as User
            if (!result.Success) return BadRequest(result);
            return Ok(result);
        }
    }
}
