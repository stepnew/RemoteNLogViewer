import React from "react";
import StyledCard from "./style";

interface ICardProps {
  height?: string;
  width?: string;
}

const Card: React.FunctionComponent<ICardProps> = React.memo<ICardProps>(
  ({ height, width, children }) => {
    return (
      <StyledCard height={height} width={width}>
        {children}
      </StyledCard>
    );
  }
);

export default Card;
