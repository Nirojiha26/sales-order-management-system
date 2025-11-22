using Backend.API.Models;

namespace Backend.Application.Interfaces;

public interface IItemService
{
    Task<IEnumerable<ItemDto>> GetAllItemsAsync();
}
