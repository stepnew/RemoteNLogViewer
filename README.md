# Remote NLog Viewer

This project is a simple implementation of a React Web Application to receive notifications from NLog.

## Api

This api is used by NLog to send the layout information.

## Certificate

The api uses IdentityServer4 to create the Tokens for authorization. To this works correctly the application needs a valid certificate.

If you don't have one, you can easly create a self signed certificate using openssl [here](<https://github.com/Azure/azure-xplat-cli/wiki/Getting-Self-Signed-SSL-Certificates-(.pem-and-.pfx)>)

## Technologies

### Front-End

- React
- EmotionJs
- Create React App
- Microsoft UI Fabric

### Back-End

- ASP.Net Core
- SignalR
- NLog
- IdentityServer4
