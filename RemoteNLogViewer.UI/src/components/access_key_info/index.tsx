/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Text } from "office-ui-fabric-react";

import ShowLogSample from "../show_log_sample";
import Copyable from "../copyable";
import AccessKeyInfoWrapper from "./style";

interface IAccessKeyInfoProps {
  accessConnectionKey: string;
}

const AccessKeyInfo: React.FunctionComponent<IAccessKeyInfoProps> = React.memo(
  ({ accessConnectionKey }) => {
    return (
      <AccessKeyInfoWrapper>
        {accessConnectionKey ? (
          <React.Fragment>
            <Text variant="xLarge">Access key</Text>
            <div css={{ margin: "10px 0" }}>
              This key must be entered in the <strong>log.config</strong> file
              in the <strong>AccessKey</strong> parameter.
              <br />
              <ShowLogSample />
            </div>
            <Copyable text={accessConnectionKey} />
          </React.Fragment>
        ) : null}
      </AccessKeyInfoWrapper>
    );
  }
);

export default AccessKeyInfo;
