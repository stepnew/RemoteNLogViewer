import {
  LogLevel,
  HttpTransportType,
  HubConnectionBuilder
} from "@aspnet/signalr";

export default {
  createHub: function() {
    console.log(process.env);
    const connection = new HubConnectionBuilder();

    const conBuilder = connection
      .configureLogging(LogLevel.Information)
      .withUrl(process.env.REACT_APP_SIGNALR_URL || "", {
        transport: HttpTransportType.WebSockets,
        skipNegotiation: true,
        accessTokenFactory: () => {
          return sessionStorage.getItem("token") || "";
        }
      })
      .build();

    conBuilder
      .start()
      .then(() => console.log("Connection successfully opened!"))
      .catch((err: Error) => {
        console.log("Error starting SignalR -> ", err);
      });

    return conBuilder;
  }
};
