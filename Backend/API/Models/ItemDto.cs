namespace Backend.API.Models;

public class ItemDto
{
    public int Id { get; set; }
    public string ItemCode { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
}
