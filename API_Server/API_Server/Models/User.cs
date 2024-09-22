using Microsoft.AspNetCore.Identity;

namespace API_Server.Models
{
    public class User:IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }
        
        public bool Status {  get; set; }
        public List<Posts> Posts { get; set; }
        public List<Favourite> Favourites { get; set; }
        public List<Cart> Carts { get; set; }
        public List<Rating> Ratings { get; set; }
        public List<Comment> Comments { get; set; } 
        public List<Invoice> Invoices { get; set; }
    }
    
}
