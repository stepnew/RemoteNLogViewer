using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.Extensions.Configuration;

namespace RemoteNLogViewer.Api
{
    public class DefaultUserGrantType : IExtensionGrantValidator
    {
        readonly IConfiguration _config;

        public DefaultUserGrantType(IConfiguration config)
        {
            _config = config;
        }
        public string GrantType => "user";

        public async Task ValidateAsync(ExtensionGrantValidationContext context)
        {
            await Task.Delay(1000);

            string userName = context.Request.Raw.Get("userName");
            string password = context.Request.Raw.Get("password");

            var customReturn = new Dictionary<string, object>();

            if (string.IsNullOrEmpty(userName))
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "User Name property is required.");
                return;
            }

            string displayName = _config.GetValue<string>("RemoteNLogViewer:User:DisplayName");
            string userNameConfig = _config.GetValue<string>("RemoteNLogViewer:User:UserName");
            string passwordConfig = _config.GetValue<string>("RemoteNLogViewer:User:Password");

            if (userName != userNameConfig ||
                password != passwordConfig)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Invalid User or Password");
                return;
            }

            customReturn.Add("displayName", displayName);

            context.Result = new GrantValidationResult(userName, "user", customResponse: customReturn);
            return;
        }
    }
}