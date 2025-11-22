namespace Backend.API.Models;

public class SalesOrderItemDto
{
    public int ItemId { get; set; }
    public string? Note { get; set; }
    public int Quantity { get; set; }
    public decimal TaxRate { get; set; }
}
