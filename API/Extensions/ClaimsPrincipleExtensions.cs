using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        // returns the username of the user
        public static string GetUsername(this ClaimsPrincipal user)
        {
            // ClaimTypes.NameIdentifier now it represents User's ID
            // ClaimTypes.Name now represents User's unique name property that we set inside our token
            // because in TokenService class we have the following
            // new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
            // new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)

            // ClaimTypes.Name represents JwtRegisteredClaimNames.UniqueName
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        // returning User's Id
        public static int GetUserId(this ClaimsPrincipal user)
        {
            // NameIdentifier represents JwtRegisteredClaimNames.NameId
            // so we convert string into int
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
