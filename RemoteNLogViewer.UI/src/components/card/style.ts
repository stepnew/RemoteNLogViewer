import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface ICard {
  height?: string;
  width?: string;
}

const StyledCard = styled.div<ICard>`
  ${({ width = "auto", height = "auto" }: ICard) => {
    return css`
      padding: 20px;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;

      width: ${width};
      height: ${height};
    `;
  }}
`;

export default StyledCard;
