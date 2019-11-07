/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { List, Separator } from "office-ui-fabric-react";

import LogBodyWrapper from "./style";
import LogItem, { ILogItem } from './log_item';

interface ILogBodyProps {
  logs: Object[];
}

const LogBody: React.FunctionComponent<ILogBodyProps> = React.memo(
  ({ logs }) => {
    const onRenderCell = (props: ILogItem) => {
      return (
        <React.Fragment>
          <LogItem {...props} />
          <Separator css={{ marginTop: "20px" }} />
        </React.Fragment>
      );
    };

    return (
      <LogBodyWrapper>
        <List items={logs} onRenderCell={onRenderCell} />
      </LogBodyWrapper>
    );
  }
);

export default LogBody;
