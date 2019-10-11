using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace RemoteNLogViewer.Api.Hubs
{
    [Authorize]
    public class LogHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            string userIdent = this.Context.UserIdentifier;
            await Clients.User(userIdent).SendAsync("ReceiveConnection", Context.ConnectionId);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(System.Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}