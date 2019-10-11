using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace RemoteNLogViewer.Api
{
    public class UserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection) => connection.User?.FindFirstValue("sub");
    }
}