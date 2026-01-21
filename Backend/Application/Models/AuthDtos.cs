using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Models
{
    public record LoginRequestDto(string Username, string Password);
    public record RegisterRequestDto(string Username, string Email, string Password, string FullName);

    public class AuthResultDto
    {
        public bool Success { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public string? Username { get; set; }
        public string[]? Errors { get; set; }
    }

    public class RegisterResultDto
    {
        public bool Success { get; set; }
        public string[]? Errors { get; set; }
    }
}
