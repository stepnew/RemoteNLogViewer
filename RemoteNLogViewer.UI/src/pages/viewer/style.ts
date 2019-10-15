import { css } from "@emotion/core";
import styled from "../../theme/styled";
import { Button } from "office-ui-fabric-react";

const ViewerWrapper = styled.div``;

export const Header = styled.header`
  ${({
    theme: {
      palette: { themeDarker }
    }
  }) => {
    return css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      line-height: 64px;
      padding: 0 50px;
      background-color: ${themeDarker};
      color: #ffffff;
    `;
  }}
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonLogout = styled(Button)`
  background: transparent;
  border: 1px solid #fff;
  padding: 10px 8px;
  margin-left: 10px;
  color: #fff;
`;

export const Content = styled.div`
  padding: 30px;
`;

export default ViewerWrapper;
