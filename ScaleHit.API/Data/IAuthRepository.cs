using System.Threading.Tasks;
using ScaleHit.API.Models;

namespace ScaleHit.API.Data
{
    public interface IAuthRepository
    {
        //contains only the names of the mathods that avialable in the AuthRepository
         Task<User> Register(User user, string password);

         Task<User> Login(string username, string password);

         Task<bool> UserExists(string username);

         Task<bool> PasswordCorrect(int userId, string password);

         Task<bool> UpdatePassword(int userId, string password);

    }
}