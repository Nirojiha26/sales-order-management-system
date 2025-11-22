using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        if (!context.Clients.Any())
        {
            context.Clients.AddRange(
                new Client { Name = "ABC Traders", Address1 = "12 Main Street", Address2 = "Colombo", State = "Western", PostCode = "10000" },
                new Client { Name = "Global Distributors", Address1 = "45 Market Road", Address2 = "Kandy", State = "Central", PostCode = "20000" },
                new Client { Name = "Sunrise Suppliers", Address1 = "78 Lake View", Address2 = "Galle", State = "Southern", PostCode = "80000" },
                new Client { Name = "Prime Retailers", Address1 = "20 Hill Street", Address2 = "Jaffna", State = "Northern", PostCode = "40000" },
                new Client { Name = "Star Enterprises", Address1 = "90 Sea Road", Address2 = "Negombo", State = "Western", PostCode = "11500" }
            );
        }

        if (!context.Items.Any())
        {
            context.Items.AddRange(
                new Item { ItemCode = "ITM001", Description = "Blue Pen", Price = 50 },
                new Item { ItemCode = "ITM002", Description = "Notebook A5", Price = 200 },
                new Item { ItemCode = "ITM003", Description = "Marker Black", Price = 120 },
                new Item { ItemCode = "ITM004", Description = "Pencil HB", Price = 40 },
                new Item { ItemCode = "ITM005", Description = "File Folder", Price = 80 }
            );
        }

        await context.SaveChangesAsync();
    }
}
