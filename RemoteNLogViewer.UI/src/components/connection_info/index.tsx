import React from "react";
import { Text } from "office-ui-fabric-react";

import ConnectionInfoWrapper from "./style";

interface IConnectionInfoProps {
  connectionId?: string;
}

const ConnectionInfo: React.FunctionComponent<
  IConnectionInfoProps
> = React.memo<IConnectionInfoProps>(({ connectionId }) => {
  return connectionId ? (
    <ConnectionInfoWrapper>
      <Text>Your connection</Text>
      {connectionId}
    </ConnectionInfoWrapper>
  ) : null;
});

export default ConnectionInfo;
