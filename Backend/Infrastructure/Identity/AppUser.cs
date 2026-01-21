using Microsoft.AspNetCore.Identity;

namespace Backend.Infrastructure.Identity
{
    // Extend IdentityUser to add custom properties (if needed)
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        // Add additional profile properties here
    }
}
