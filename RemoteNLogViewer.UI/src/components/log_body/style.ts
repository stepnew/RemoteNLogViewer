import styled from "../../theme/styled";

const LogBodyWrapper = styled.div`
  margin-top: 15px;
  background-color: #ffffff;
  padding: 20px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  /* margin-bottom: 48px; */
`;

export const ItemInfoContent = styled.div`
  margin-left: 15px;
`;

export const ItemDescription = styled.div`
  margin-bottom: 10px;
`;

export const ItemHttpMethod = styled.div`
  display: flex;
  align-items: center;

  * {
    margin-right: 5px;
  }
`;

export default LogBodyWrapper;
