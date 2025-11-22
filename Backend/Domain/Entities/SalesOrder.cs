namespace Backend.Domain.Entities;

public class SalesOrder
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public DateTime InvoiceDate { get; set; }
    public string? InvoiceNumber { get; set; }
    public string? Reference { get; set; }

    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }

    public Client? Client { get; set; }
    public ICollection<SalesOrderItem> Items { get; set; } = new List<SalesOrderItem>();
}
