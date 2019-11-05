import React from "react";
import { PrimaryButton, Stack } from "office-ui-fabric-react";

interface ILogActionsProps {
  createConnection: () => void;
  createAccessKey: () => Promise<void>;
  endSession: () => void;
  connectionId?: string;
  accessConnectionKey?: string;
}

const LogActions: React.FunctionComponent<ILogActionsProps> = React.memo(
  ({
    createConnection,
    createAccessKey,
    endSession,
    connectionId,
    accessConnectionKey
  }) => {
    return (
      <Stack horizontal tokens={{ childrenGap: 5 }}>
        {!connectionId && (
          <PrimaryButton type="primary" onClick={() => createConnection()}>
            Create new Session
          </PrimaryButton>
        )}
        {connectionId && (
          <PrimaryButton
            type="primary"
            disabled={accessConnectionKey && true}
            onClick={createAccessKey}
          >
            Create Access Key
          </PrimaryButton>
        )}
        {connectionId && accessConnectionKey && (
          <PrimaryButton onClick={endSession}>End Session</PrimaryButton>
        )}
      </Stack>
    );
  }
);

export default LogActions;
