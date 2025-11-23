using Backend.API.Models;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Infrastructure.Repositories.Interfaces;

namespace Backend.Application.Services;

public class SalesOrderService : ISalesOrderService
{
    private readonly ISalesOrderRepository _orderRepo;

    public SalesOrderService(ISalesOrderRepository repo)
    {
        _orderRepo = repo;
    }

    public async Task<int> CreateOrderAsync(SalesOrderDto dto)
    {
        var order = new SalesOrder
        {
            ClientId = dto.ClientId,
            InvoiceDate = dto.InvoiceDate,
            InvoiceNumber = dto.InvoiceNumber,
            Reference = dto.Reference,
            TotalExcl = dto.TotalExcl,
            TotalTax = dto.TotalTax,
            TotalIncl = dto.TotalIncl,
            Items = dto.Items.Select(i => new SalesOrderItem
            {
                ItemId = i.ItemId,
                Note = i.Note,
                Quantity = i.Quantity,
                TaxRate = i.TaxRate,
                // Calculation is optional here:
                Price = 0,  
            }).ToList()
        };

        return await _orderRepo.CreateOrderAsync(order);
    }

    public async Task<SalesOrderDto?> GetOrderByIdAsync(int id)
    {
        var order = await _orderRepo.GetOrderByIdAsync(id);
        if (order == null) return null;

        return new SalesOrderDto
        {
            ClientId = order.ClientId,
            InvoiceDate = order.InvoiceDate,
            InvoiceNumber = order.InvoiceNumber,
            Reference = order.Reference,
            TotalExcl = order.TotalExcl,
            TotalTax = order.TotalTax,
            TotalIncl = order.TotalIncl,
            Items = order.Items.Select(i => new SalesOrderItemDto
            {
                ItemId = i.ItemId,
                Note = i.Note,
                Quantity = i.Quantity,
                TaxRate = i.TaxRate
            }).ToList()
        };
    }

    public async Task<IEnumerable<SalesOrderDto>> GetAllOrdersAsync()
    {
        var list = await _orderRepo.GetAllAsync();

        return list.Select(order => new SalesOrderDto
        {
            ClientId = order.ClientId,
            InvoiceDate = order.InvoiceDate,
            InvoiceNumber = order.InvoiceNumber,
            Reference = order.Reference,
            TotalExcl = order.TotalExcl,
            TotalTax = order.TotalTax,
            TotalIncl = order.TotalIncl,
            Items = order.Items.Select(i => new SalesOrderItemDto
            {
                ItemId = i.ItemId,
                Note = i.Note,
                Quantity = i.Quantity,
                TaxRate = i.TaxRate
            }).ToList()
        });
    }
}

