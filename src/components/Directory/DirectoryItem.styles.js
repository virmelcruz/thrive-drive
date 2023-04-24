import styled from 'styled-components';

const DirectoryItemContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e2e2;
  justify-content: space-between;
  padding: 3px;
`;

const DirectoryItemDetail = styled.div`
  display: flex;

  svg {
    margin-right: 8px;
  }
`;

const DirectoryOption = styled.button`

`;

export {
  DirectoryItemContainer,
  DirectoryItemDetail,
  DirectoryOption,

}