using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            if (await userManager.FindByNameAsync("admin") == null)
            {
                var adminUser = new User
                {
                    UserName = "admin",
                };

                var result = await userManager.CreateAsync(adminUser, "Lena1234!");

                if (result.Succeeded)
                {
                    Console.WriteLine("Admin user created successfully!");
                }
                else
                {
                    Console.WriteLine("Failed to create admin user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"- {error.Description}");
                    }
                }
            }
            else
            {
                Console.WriteLine("Admin user already exists.");
            }
        }
    }
}