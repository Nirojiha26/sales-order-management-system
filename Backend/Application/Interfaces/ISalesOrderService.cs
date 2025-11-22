using Backend.API.Models;

namespace Backend.Application.Interfaces;

public interface ISalesOrderService
{
    Task<int> CreateOrderAsync(SalesOrderDto dto);
    Task<SalesOrderDto?> GetOrderByIdAsync(int id);
    Task<IEnumerable<SalesOrderDto>> GetAllOrdersAsync();
}
