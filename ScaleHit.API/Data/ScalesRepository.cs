using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ScaleHit.API.Models;

namespace ScaleHit.API.Data
{
    public class ScalesRepository : IScalesRepository
    {
        private readonly DataContext _context;
        public ScalesRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int Id)
        {
            var user = await _context.Users.Include(s => s.Scales).FirstOrDefaultAsync(u => u.Id == Id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(s => s.Scales).ToListAsync();
            return users;
        }

        public async Task<IEnumerable<Scale>> GetScales(int userId)
        {
            var scales = await _context.Scales.Where(s => s.UserId == userId).ToListAsync();
            return scales;
        }

        public async Task<Scale> GetScale(int Id) {
            var scale = await _context.Scales.FirstOrDefaultAsync(s => s.Id == Id);
            return scale;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}