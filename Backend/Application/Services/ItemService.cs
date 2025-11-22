using Backend.API.Models;
using Backend.Application.Interfaces;
using Backend.Infrastructure.Repositories.Interfaces;

namespace Backend.Application.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _itemRepo;

    public ItemService(IItemRepository repo)
    {
        _itemRepo = repo;
    }

    public async Task<IEnumerable<ItemDto>> GetAllItemsAsync()
    {
        var items = await _itemRepo.GetAllAsync();

        return items.Select(i => new ItemDto
        {
            Id = i.Id,
            ItemCode = i.ItemCode,
            Description = i.Description,
            Price = i.Price
        });
    }
}
