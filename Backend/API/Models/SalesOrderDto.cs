namespace Backend.API.Models;

public class SalesOrderDto
{
    public int ClientId { get; set; }
    public DateTime InvoiceDate { get; set; }
    public string? InvoiceNumber { get; set; }
    public string? Reference { get; set; }

    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }

    public List<SalesOrderItemDto>? Items { get; set; }
}
