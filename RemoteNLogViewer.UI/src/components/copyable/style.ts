import styled from "../../theme/styled";

const CopyableWrapper = styled.div`
  display: flex;
  align-items: center;

  .icon-file-copy {
    color: ${props => props.theme.palette.themePrimary};
    display: flex;
  }
`;

export default CopyableWrapper;
