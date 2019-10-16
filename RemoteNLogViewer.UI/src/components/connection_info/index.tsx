/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Text } from "office-ui-fabric-react";

import ConnectionInfoWrapper from "./style";

interface IConnectionInfoProps {
  connectionId?: string;
}

const ConnectionInfo: React.FunctionComponent<
  IConnectionInfoProps
> = React.memo(({ connectionId }) => {
  return connectionId ? (
    <ConnectionInfoWrapper>
      <Text block variant="xLarge">
        Your connection
      </Text>
      <div css={{ margin: "10px 0" }}>{connectionId}</div>
    </ConnectionInfoWrapper>
  ) : null;
});

export default ConnectionInfo;
