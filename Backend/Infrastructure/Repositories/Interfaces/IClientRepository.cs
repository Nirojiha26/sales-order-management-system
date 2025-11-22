using Backend.Domain.Entities;

namespace Backend.Infrastructure.Repositories.Interfaces;

public interface IClientRepository
{
    Task<IEnumerable<Client>> GetAllAsync();
}
