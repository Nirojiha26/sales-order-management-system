using Backend.API.Models;

namespace Backend.Application.Interfaces;

public interface IClientService
{
    Task<IEnumerable<ClientDto>> GetAllClientsAsync();
}
