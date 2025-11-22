using Backend.Domain.Entities;

namespace Backend.Infrastructure.Repositories.Interfaces;

public interface IItemRepository
{
    Task<IEnumerable<Item>> GetAllAsync();
}
