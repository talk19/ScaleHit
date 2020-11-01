using Microsoft.AspNetCore.Http;

namespace ScaleHit.API.helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message) {
            //add the error message to the response
            response.Headers.Add("Application-Error",message);

            //allow it to expose in the client
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            
            //allow the client to show errors from other origin (like the API)
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }
    }
}