using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using IdentityModel.AspNetCore.OAuth2Introspection;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RemoteNLogViewer.Api.Hubs;

namespace RemoteNLogViewer.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureCors(services);

            //Configure IdentityServer4 to generate tokens
            ConfigureIdentityServer(services);

            //Configure Authentication to use IdentityServer4
            ConfigureAuthentication(services);

            services.AddHttpClient("ids", c =>
            {
                c.BaseAddress = new Uri(Configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:Authority"));
            });

            services.AddTransient<IUserIdProvider, UserIdProvider>();

            services.AddMvcCore()
                    .AddJsonFormatters()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddApiVersioning();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("Defaultcors");
            app.UseIdentityServer();
            app.UseAuthentication();

            app.UseSignalR(hub =>
            {
                hub.MapHub<LogHub>("/loghub");
            });
            app.UseMvc();
        }

        private void ConfigureCors(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("Defaultcors", builder =>
            {
                var originsSettings = Configuration.GetValue<string>("RemoteNLogViewer:Cors:AllowedHosts");

                builder.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();

                if (originsSettings.Any(a => a.Equals("*")))
                {
                    builder.AllowAnyOrigin();
                }
                else
                {
                    builder.WithOrigins(originsSettings.Split(";"));
                }
            }));
        }

        private void ConfigureIdentityServer(IServiceCollection services)
        {
            services.AddIdentityServer()
                    .AddSigningCredential(new X509Certificate2(Configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:CertificateLocation"),
                                                               Configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:CertificatePassword")))
                    .AddInMemoryApiResources(ResourcesConfig.Get(Configuration))
                    .AddInMemoryClients(ClientsConfig.Get(Configuration))
                    .AddExtensionGrantValidator<LdapGrantType>()
                    .AddExtensionGrantValidator<DefaultUserGrantType>();
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = Configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:Authority");
                        options.ApiName = Configuration.GetValue<string>("RemoteNLogViewer:IdentityServer:ApiName");
                        options.SaveToken = true;
                        options.RequireHttpsMetadata = Configuration.GetValue<bool>("RemoteNLogViewer:IdentityServer:RequireHttpsMetadata");
                        options.TokenRetriever = request =>
                        {
                            // This is necessary because SignalR sends the Token via QueryString
                            var accessToken = request.Query["access_token"];

                            if (!string.IsNullOrEmpty(accessToken))
                            {
                                return TokenRetrieval.FromQueryString()(request);
                            }

                            accessToken = TokenRetrieval.FromAuthorizationHeader()(request);

                            return accessToken;
                        };
                    });
        }
    }
}
