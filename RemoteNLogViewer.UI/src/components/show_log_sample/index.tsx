/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Dialog, ActionButton, DialogType } from "office-ui-fabric-react";

import LogConfigSample from "../log_config_sample";

const ShowLogSample: React.FunctionComponent = React.memo(() => {
  const [isHidden, setHidden] = useState(true);

  return (
    <React.Fragment>
      <ActionButton
        iconProps={{ iconName: "codeView" }}
        text="View Example"
        onClick={() => setHidden(false)}
        css={({ palette: { themePrimary } }) => ({ color: themePrimary })}
      />
      <Dialog
        hidden={isHidden}
        dialogContentProps={{
          type: DialogType.normal,
          title: "NLog Config Sample"
        }}
        maxWidth={1000}
        minWidth={800}
        onDismiss={() => setHidden(true)}
      >
        <LogConfigSample />
      </Dialog>
    </React.Fragment>
  );
});

export default ShowLogSample;
