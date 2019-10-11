using System.Collections.Generic;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;

namespace RemoteNLogViewer.Api
{
    public static class ClientsConfig
    {
        public static List<Client> Get(IConfiguration configuration)
        {
            string apiName = configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:ApiName");
            string secretKey = configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:SecretKey");
            string grantType = configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:GrantType");

            return new List<Client> {
            new Client {
              ClientId = apiName,
              AllowedGrantTypes = { grantType },
              ClientSecrets = new List<Secret> { new Secret(secretKey.Sha256() ) },
              AllowedScopes = { apiName },
              AllowOfflineAccess = true
            }
          };
        }
    }

    public static class ResourcesConfig
    {
        public static List<ApiResource> Get(IConfiguration configuration)
        {
            string apiName = configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:ApiName");
            string secretKey = configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:SecretKey");

            return new List<ApiResource> {
            new ApiResource(apiName, apiName)
            {
              ApiSecrets = new List<Secret> { new Secret(secretKey.Sha256() ) }
            }
          };
        }
    }
}