using API_Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API_Server.Data
{
    public class APIServerContext : IdentityDbContext<User>
    {
        public APIServerContext(DbContextOptions<APIServerContext> options)
          : base(options)
        {
        }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Favourite> Favorites { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoicesDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Pay> Pays { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Specification> Specifications { get; set; }
        public DbSet<Screen> Screens { get; set; }
        public DbSet<OperatingSystemAndCPU> OperatingSystemsAndCPUs { get; set; }
        public DbSet<Connect> Connects { get; set; }
        public DbSet<Utility> Utilities { get; set; }
        public DbSet<GeneralInformation> GeneralInformations { get; set; }
        public DbSet<BatteryandCharger> BatteryandChargers { get; set; }
        public DbSet<MemoryandStorage> MemoryAndStorages { get; set;}
        public DbSet<FrontCamera> FrontCameras { get; set;}
        public DbSet<RearCamera> RearCameras { get; set;}
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<PageView> PageViews { get; set; } 
        public DbSet<ProductView> ProductViews { get; set; } 

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
   modelBuilder.Entity<ProductDetail>()
       .HasOne(pd => pd.Product)
       .WithMany(p => p.ProductDetails)
       .HasForeignKey(pd => pd.ProductId)
       .OnDelete(DeleteBehavior.Restrict); // Hoặc sử dụng .NoAction() tùy thuộc vào yêu cầu của bạn

   modelBuilder.Entity<ProductDetail>()
       .HasOne(pd => pd.Color)
       .WithMany(c => c.ProductPDetails)
       .HasForeignKey(pd => pd.ColorId)
       .OnDelete(DeleteBehavior.Restrict); // Tránh xóa cascade

   //modelBuilder.Entity<ProductDetail>()
   //    .HasOne(pd => pd.Promotion)
   //    .WithMany(pr => pr.ProductDetails)
   //    .HasForeignKey(pd => pd.PromotionId)
   //    .OnDelete(DeleteBehavior.Restrict); // Tránh xóa cascade

   // Cấu hình các khóa ngoại khác nếu cần thiết
   // ...

   base.OnModelCreating(modelBuilder);
  }

 }
}
