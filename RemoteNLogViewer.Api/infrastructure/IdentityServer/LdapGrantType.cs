using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace RemoteNLogViewer.Api
{
    public class LdapGrantType : IExtensionGrantValidator
    {
        readonly IConfiguration _config;

        public LdapGrantType(IConfiguration config)
        {
            _config = config;
        }
        public string GrantType => "ldap";

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

            string path = _config.GetValue<string>("RemoteNLogViewer:Ldap:Path");
            string userDomainName = _config.GetValue<string>("RemoteNLogViewer:Ldap:UserDomainName");

            using (DirectoryEntry entry = new DirectoryEntry($"LDAP://{userDomainName}",
                                                             $"{userDomainName}\\{userName}",
                                                             password))
            {
                using (DirectorySearcher searcher = new DirectorySearcher(entry))
                {
                    searcher.Filter = $"(SAMAccountName={userName})";
                    searcher.PropertiesToLoad.Add("DisplayName");
                    searcher.PropertiesToLoad.Add("SAMAccountName");
                    searcher.PropertiesToLoad.Add("cn");
                    var result = searcher.FindOne();

                    if (result == null)
                    {
                        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Invalid User or Password");
                        return;
                    }

                    customReturn.Add("displayName", result.Properties["DisplayName"][0].ToString());
                    customReturn.Add("samAccountName", result.Properties["SAMAccountName"][0].ToString());
                }
            }

            context.Result = new GrantValidationResult(userName, "ldap", customResponse: customReturn);
            return;
        }
    }
}