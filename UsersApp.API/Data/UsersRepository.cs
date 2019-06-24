using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersApp.API.Models;
using Microsoft.EntityFrameworkCore;


namespace UsersApp.API.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext context;

        public UsersRepository(DataContext context)
        {
            this.context = context;
        }
        public void Add<T>(T entity) where T : class
        {
             context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
          context.Remove(entity);
        }

        public async Task<User> getUser(int id)
        {
           var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user; //if there is no user it returns nul
        }

        public async Task<IEnumerable<User>> getUsers()
        {
         var users = await context.Users.ToListAsync();
            return users;
        }

        public async Task<bool> saveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}