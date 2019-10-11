using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using RemoteNLogViewer.Api.Hubs;

namespace RemoteNLogViewer.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/logs")]
    public class LogViewerController : ControllerBase
    {
        private readonly IHubContext<LogHub> LogHub;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;

        public LogViewerController(IHubContext<LogHub> hub,
                                   IHttpClientFactory clientFactory,
                                   IConfiguration configuration)
        {
            LogHub = hub;
            _clientFactory = clientFactory;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> IniciarSessao([FromBody]Login login)
        {
            string apiName = _configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:ApiName");
            string secretKey = _configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:SecretKey");
            string grantType = _configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:GrantType");

            try
            {
                var client = _clientFactory.CreateClient("ids");
                var token = await client.RequestTokenAsync(new TokenRequest
                {
                    Address = "connect/token",
                    ClientId = apiName,
                    ClientSecret = secretKey,
                    GrantType = grantType,

                    Parameters = {
                        {"userName", login.UserName},
                        {"password", login.Password},
                        {"scope", apiName}
                    }
                });

                if (token.IsError)
                {
                    return BadRequest(new { Message = token.Error });
                }

                return Ok(token.Json);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> GetLogFromNLogViewer(LogLayout layout)
        {
            await LogHub.Clients.Group(layout.AccessKey).SendAsync("ReceiveLayout", layout);
            return Ok();
        }

        [HttpPost("create_channel")]
        public async Task<IActionResult> CreatePrivateChannel([FromBody]ChannelContext channelContext)
        {
            string accessKey = RNGCreator.GetKey(32);

            channelContext.AccessKey = accessKey;

            await LogHub.Groups.AddToGroupAsync(channelContext.ConnectionId, accessKey);

            return Ok(channelContext);
        }

        [HttpPost("end_session")]
        public async Task<IActionResult> EndSessionChannel([FromBody]ChannelContext channelContext)
        {
            await LogHub.Groups.RemoveFromGroupAsync(channelContext.ConnectionId, channelContext.AccessKey);

            return Ok(new
            {
                Success = true
            });
        }
    }

    public class ChannelContext
    {
        public string ConnectionId { get; set; }
        public string AccessKey { get; set; }
    }

    public class Login
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class LogLayout
    {
        public object Logger { get; set; }
        public string AccessKey { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public string AppName { get; set; }
        public string AppEnv { get; set; }
        public string Ip { get; set; }
        public string HttpMethod { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public string Error { get; set; }
    }
}
