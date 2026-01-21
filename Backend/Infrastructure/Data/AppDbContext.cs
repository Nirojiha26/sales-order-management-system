using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Client> Clients { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<SalesOrder> SalesOrders { get; set; }
    public DbSet<SalesOrderItem> SalesOrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Relationships
        modelBuilder.Entity<SalesOrder>()
            .HasOne(o => o.Client)
            .WithMany()
            .HasForeignKey(o => o.ClientId);

        modelBuilder.Entity<SalesOrderItem>()
            .HasOne(i => i.SalesOrder)
            .WithMany(o => o.Items)
            .HasForeignKey(i => i.SalesOrderId);

        modelBuilder.Entity<SalesOrderItem>()
            .HasOne(i => i.Item)
            .WithMany()
            .HasForeignKey(i => i.ItemId);

        // Precision for decimals
        modelBuilder.Entity<Item>().Property(x => x.Price).HasColumnType("decimal(18,2)");
        
        modelBuilder.Entity<SalesOrder>().Property(x => x.TotalExcl).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<SalesOrder>().Property(x => x.TotalIncl).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<SalesOrder>().Property(x => x.TotalTax).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<SalesOrderItem>().Property(x => x.ExclAmount).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<SalesOrderItem>().Property(x => x.InclAmount).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<SalesOrderItem>().Property(x => x.Price).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<SalesOrderItem>().Property(x => x.TaxAmount).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<SalesOrderItem>().Property(x => x.TaxRate).HasColumnType("decimal(18,4)");
    }
}
