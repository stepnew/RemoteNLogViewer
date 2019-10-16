/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Modal, ActionButton } from "office-ui-fabric-react";

import LogConfigSample from "../log_config_sample";

const ShowLogSample: React.FunctionComponent = React.memo(() => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <React.Fragment>
      <ActionButton
        iconProps={{ iconName: "codeView" }}
        text="View Example"
        onClick={() => setVisibleModal(true)}
        css={({ palette: { themePrimary } }) => ({ color: themePrimary })}
      />
      <Modal        
        isOpen={visibleModal}
        onDismiss={() => setVisibleModal(false)}
      >
        <LogConfigSample />
      </Modal>
    </React.Fragment>
  );
});

export default ShowLogSample;
