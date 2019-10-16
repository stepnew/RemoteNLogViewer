import React, { useState } from "react";
import { Icon, Text, Stack, TooltipHost } from "office-ui-fabric-react";
import copy from "copy-to-clipboard";

import CopyableWrapper from "./style";

interface ICopyableProps {
  text: string;
}

const Copyable: React.FunctionComponent<ICopyableProps> = React.memo(
  ({ text }) => {
    const [contentTooltip, setContentTooltip] = useState("Copy");

    const handleClickFileCopy = () => {
      copy(text);
      setContentTooltip("Copied");

      setTimeout(() => {
        setContentTooltip("Copy");
      }, 1000);
    };

    return (
      <CopyableWrapper>
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
        >
          <Text>{text}</Text>
          <TooltipHost content={contentTooltip}>
            <Icon
              iconName="fileCopy"
              onClick={handleClickFileCopy}
              className="icon-file-copy"
            />
          </TooltipHost>
        </Stack>
      </CopyableWrapper>
    );
  }
);

export default Copyable;
