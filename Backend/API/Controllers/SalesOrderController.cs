using Backend.API.Models;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesOrderController : ControllerBase
{
    private readonly ISalesOrderService _salesOrderService;

    public SalesOrderController(ISalesOrderService salesOrderService)
    {
        _salesOrderService = salesOrderService;
    }

    // POST: api/salesorder
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] SalesOrderDto dto)
    {
        var id = await _salesOrderService.CreateOrderAsync(dto);
        return Ok(new { OrderId = id, Message = "Order created successfully" });
    }

    // GET: api/salesorder/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _salesOrderService.GetOrderByIdAsync(id);
        if (order == null) return NotFound();

        return Ok(order);
    }

    // GET: api/salesorder
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _salesOrderService.GetAllOrdersAsync();
        return Ok(orders);
    }
}
