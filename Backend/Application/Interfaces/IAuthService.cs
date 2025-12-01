using Backend.Application.Models; // DTOs we'll create

namespace Backend.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultDto> LoginAsync(LoginRequestDto login);
        Task<RegisterResultDto> RegisterAsync(RegisterRequestDto register, string role = "User");
    }
}
