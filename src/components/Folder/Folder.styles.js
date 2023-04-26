import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  max-height: calc(100% - 60px);
`

const FolderItem = styled.button`
  align-items: center;
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
  background: none;
  border: none;

  :hover {
    background-color: rgb(233 233 233);
  }
`

const FolderLinkItem = styled.div`
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