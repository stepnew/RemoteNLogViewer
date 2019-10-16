/** @jsx jsx */
import React, { useCallback, useRef, useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import { Text, Stack } from "office-ui-fabric-react";
import { useHistory } from "react-router";
import { HubConnection } from "@aspnet/signalr";

import ViewerWrapper, {
  Header,
  HeaderInfo,
  ButtonLogout,
  Content,
  StackInfoContent
} from "./style";
import Card from "../../components/card";
import hub from "../../infra/signalr_hub";

import http from "../../infra/http";
import ConnectionInfo from "../../components/connection_info";
import AccessKeyInfo from "../../components/access_key_info";
import LogActions from "../../components/log_actions";
import LogBody from "../../components/log_body";

const objLog = [
  {
    level: "debug",
    date: "11/11/1111",
    logger: "aaaaaaa",
    appName: "RemoteNLoViewer",
    appEnv: "Development",
    message: "bbbbbbbbbbbbbbbbb",
    error: "eeeeeeeeeeeeeeeeeee",
    httpMethod: "POST",
    controllerName: "User",
    actionName: "login",
    ip: "iiiiiiiii"
  },
  {
    level: "trace",
    date: "11/11/1111",
    logger: "aaaaaaa",
    appName: "RemoteNLoViewer",
    appEnv: "Development",
    message: "bbbbbbbbbbbbbbbbb",
    error: "eeeeeeeeeeeeeeeeeee",
    httpMethod: "GET",
    controllerName: "User",
    actionName: "login",
    ip: "iiiiiiiii"
  },
  {
    level: "info",
    date: "11/11/1111",
    logger: "aaaaaaa",
    appName: "RemoteNLoViewer",
    appEnv: "Development",
    message: "bbbbbbbbbbbbbbbbb",
    error: "eeeeeeeeeeeeeeeeeee",
    httpMethod: "PUT",
    controllerName: "User",
    actionName: "login",
    ip: "iiiiiiiii"
  },
  {
    level: "fatal",
    date: "11/11/1111",
    logger: "aaaaaaa",
    appName: "RemoteNLoViewer",
    appEnv: "Development",
    message: "bbbbbbbbbbbbbbbbb",
    error: "eeeeeeeeeeeeeeeeeee",
    httpMethod: "DELETE",
    controllerName: "User",
    actionName: "login",
    ip: "iiiiiiiii"
  },
  {
    level: "warn",
    date: "11/11/1111",
    logger: "aaaaaaa",
    appName: "RemoteNLoViewer",
    appEnv: "Development",
    message: "bbbbbbbbbbbbbbbbb",
    error: "eeeeeeeeeeeeeeeeeee",
    httpMethod: "DELETE",
    controllerName: "User",
    actionName: "login",
    ip: "iiiiiiiii"
  },
  {
    level: "error",
    date: "11/11/1111",
    logger: "aaaaaaa",
    appName: "RemoteNLoViewer",
    appEnv: "Development",
    message: "bbbbbbbbbbbbbbbbb",
    error: "eeeeeeeeeeeeeeeeeee",
    httpMethod: "DELETE",
    controllerName: "User",
    actionName: "login",
    ip: "iiiiiiiii"
  },
];

const ViewerPage: React.FunctionComponent = React.memo(() => {
  const { push } = useHistory();
  const hubRef = useRef<HubConnection>();
  const [logs, setLogs] = useState(objLog);
  const [connectionId, setConnectionId] = useState<string | null>();
  const [accessConnectionKey, setAccessConnectionKey] = useState<
    string | null
  >();

  const onClickButtonLogout = useCallback(() => {
    sessionStorage.clear();
    push("/");
  }, [push]);

  const receiveLayout = (layout: Object[]) => {
    // setLogs(prevLogs => [...prevLogs, layout]);
  };

  const createAccessKey = React.useCallback(async () => {
    try {
      var resultado = await http.post(
        "/api/v1/logs/create_channel",
        {
          connectionId
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      );
      setAccessConnectionKey(resultado.data.data.accessKey);
    } catch (error) {
      console.log(error);
    }
  }, [connectionId]);

  const createConnection = useCallback(() => {
    if (!hubRef.current) {
      hubRef.current = hub.createHub();

      const receiveConnection = (signalrConnectionId: string) => {
        setConnectionId(signalrConnectionId);
      };

      hubRef.current.on("ReceiveConnection", receiveConnection);
      hubRef.current.on("ReceiveLayout", receiveLayout);
    }
  }, []);

  const endSession = async () => {
    try {
      await http.post(
        "/api/v1/logs/end_session",
        {
          connectionId,
          accessConnectionKey
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      );

      hubRef.current.stop();
      hubRef.current = null;
      setAccessConnectionKey(null);
      setConnectionId(null);
      setLogs([]);

      console.log("Connection terminated successfully");
    } catch (error) {
      console.log(error);
      console.log("A problem was encountered while logging out");
    }
  };

  useEffect(() => {
    createConnection();

    return () => {
      hubRef.current.stop();
      hubRef.current = null;
    };
  }, [createConnection]);

  return (
    <ViewerWrapper>
      <Header>
        <Text variant="large">Remote NLog Viewer</Text>
        <HeaderInfo>
          <Text>
            {sessionStorage.getItem("userName")} (
            {sessionStorage.getItem("displayName")})
          </Text>
          <ButtonLogout
            iconProps={{ iconName: "User" }}
            text="Logout"
            onClick={onClickButtonLogout}
          />
        </HeaderInfo>
      </Header>
      <Content>
        <Card>
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <StackInfoContent>
              <ConnectionInfo connectionId={connectionId} />
              <LogActions
                createConnection={createConnection}
                connectionId={connectionId}
                accessConnectionKey={accessConnectionKey}
                endSession={endSession}
                createAccessKey={createAccessKey}
              />
            </StackInfoContent>
            <StackInfoContent>
              <AccessKeyInfo accessConnectionKey={accessConnectionKey} />
            </StackInfoContent>
          </Stack>
        </Card>
        <LogBody logs={logs} />
      </Content>
    </ViewerWrapper>
  );
});

export default ViewerPage;
