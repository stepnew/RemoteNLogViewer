import React from "react";
import TagWrapper from "./style";

interface ITagProps {
  color: string;
}
const Tag: React.FunctionComponent<ITagProps> = React.memo(
  ({ color, children }) => {
    return <TagWrapper color={color}>{children}</TagWrapper>;
  }
);

export default Tag;
