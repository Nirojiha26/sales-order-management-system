using Backend.Domain.Entities;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class SalesOrderRepository : ISalesOrderRepository
{
    private readonly AppDbContext _context;

    public SalesOrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateOrderAsync(SalesOrder order)
    {
        _context.SalesOrders.Add(order);
        await _context.SaveChangesAsync();
        return order.Id;
    }

    public async Task<SalesOrder?> GetOrderByIdAsync(int id)
    {
        return await _context.SalesOrders
            .Include(o => o.Client)
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<IEnumerable<SalesOrder>> GetAllAsync()
    {
        return await _context.SalesOrders
            .Include(o => o.Client)
            .Include(o => o.Items)
            .ToListAsync();
    }
}
