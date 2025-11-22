using Backend.API.Models;
using Backend.Application.Interfaces;
using Backend.Infrastructure.Repositories.Interfaces;

namespace Backend.Application.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _clientRepository;

    public ClientService(IClientRepository repo)
    {
        _clientRepository = repo;
    }

    public async Task<IEnumerable<ClientDto>> GetAllClientsAsync()
    {
        var clients = await _clientRepository.GetAllAsync();

        return clients.Select(c => new ClientDto
        {
            Id = c.Id,
            Name = c.Name,
            Address1 = c.Address1,
            Address2 = c.Address2,
            Address3 = c.Address3,
            State = c.State,
            PostCode = c.PostCode
        });
    }
}
