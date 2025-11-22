using Backend.Domain.Entities;

namespace Backend.Infrastructure.Repositories.Interfaces;

public interface ISalesOrderRepository
{
    Task<int> CreateOrderAsync(SalesOrder order);
    Task<SalesOrder?> GetOrderByIdAsync(int id);
    Task<IEnumerable<SalesOrder>> GetAllAsync();
}
