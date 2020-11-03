using System.Collections.Generic;
using System.Threading.Tasks;
using ScaleHit.API.Models;

namespace ScaleHit.API.Data
{
    public interface IScalesRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}