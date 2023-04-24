import React from 'react';

import { FaRegFile, FaRegFolder, FaEllipsisV } from 'react-icons/fa'
import { 
  DirectoryItemContainer,
  DirectoryItemDetail,
} from './DirectoryItem.styles';

const DirectoryItem = ({ type='folder', name='' }) => {

  return (
    <DirectoryItemContainer>
      <DirectoryItemDetail>
        { type === 'folder' ? <FaRegFolder /> : <FaRegFile /> }
        <div> {name} </div>
      </DirectoryItemDetail>
      <FaEllipsisV />
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;