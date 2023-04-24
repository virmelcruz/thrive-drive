import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FolderContainer = styled.div`
  display: flex;
`

const FolderItem = styled.div`
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
  user-select: none;
  width: 150px;
  text-decoration: none;
  color: #555;
  text-decoration: none;

  :hover {
    background-color: rgb(233 233 233);
  }
`

const FolderLinkItem = styled(Link)`
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
  user-select: none;
  width: 150px;
  text-decoration: none;
  color: #555;
  text-decoration: none;

  :hover {
    background-color: rgb(233 233 233);
  }
`

export {
  FolderContainer,
  FolderLinkItem,
  FolderItem,
};