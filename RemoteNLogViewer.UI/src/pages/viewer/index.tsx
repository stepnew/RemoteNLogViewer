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
  Content
} from "./style";
import Card from "../../components/card";
import hub from "../../infra/signalr_hub";

import http from "../../infra/http";
import ConnectionInfo from "../../components/connection_info";

const ViewerPage: React.FunctionComponent = React.memo(() => {
  const { push } = useHistory();
  const hubRef = useRef<HubConnection>();
  const [connectionId, setConnectionId] = useState();
  const [log, setLog] = useState([]);
  const [accessKey, setAccessKey] = useState();

  const receiveLayout = (layout: Object[]) => {
    setLog(prevLog => [...prevLog, layout]);
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
      setAccessKey(resultado.data.data.accessKey);
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

  const onClickButtonLogout = useCallback(() => {
    sessionStorage.clear();
    push("/");
  }, [push]);

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
            <ConnectionInfo connectionId={connectionId} />
          </Stack>
        </Card>
      </Content>
    </ViewerWrapper>
  );
});

export default ViewerPage;
