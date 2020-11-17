using System;
using System.Threading.Tasks;
using ScaleHit.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ScaleHit.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }

        //check the user details
        public async Task<User> Login(string username, string password)
        {
            //get the user that match to the username
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if(user == null)
                return null;

            //check the hashed password
            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //hashed the password that the user typed and check if it's match to the hashed password in the DB
             using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)) {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            
                for(int i = 0; i<computedHash.Length; i++) {
                    if(computedHash[i] != passwordHash[i]) return false;
                }
            }

            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            //method to create Hashed password
            //out keyword create refernce to the variables above, what the method update the reference, the also varibles updated
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            //save the user to DB
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
       
        }

        //create the hash password and the salt base on the user password
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }


        //check if the username exist anywhere in the DB
        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x => x.Username == username))
                return true;

            return false;

        }

        public async Task<bool> PasswordCorrect(int userId, string password) {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return false;

            return true;
        }

        public async Task<bool> UpdatePassword(int userId, string password) {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            byte[] passwordHash, passwordSalt;

            //method to create Hashed password
            //out keyword create refernce to the variables above, what the method update the reference, the also varibles updated
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            return await _context.SaveChangesAsync() > 0;

        }
    }
}