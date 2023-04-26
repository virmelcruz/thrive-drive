import React, { useContext } from 'react';
import { FolderContainer, FolderItem, FolderLinkItem } from './Folder.styles';
import { FaRegFolder, FaPlus, FaRegFile, FaEllipsisH } from 'react-icons/fa'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const Folder = ({ files, parentId = '', isPage = true }) => {
  const filteredFiles = isPage ? files : files.filter((file) => file.fileType === 'folder');
  const navigate = useNavigate();
  const {
    breadCrumbs,
    setIncreaseCrumbs,
    setDecreaseCrumbs,
    setCurrentDir,
    filesReducer,
    currentDir,
  } = useContext(AppContext);
  

  const setFolderForwardChange = (file) => {
    if (isPage) {
      setIncreaseCrumbs([{
        ...file,
        hasChild: true,
        index: breadCrumbs.length + 1,
      }]);

      navigate(`/folders/${file._id}`);
    } else {
      setCurrentDir(file._id);
    }
  };

  const setFolderBackwardChange = () => {
    if (isPage) {
      const newCrumbs = [...breadCrumbs];
      newCrumbs.pop();
      setDecreaseCrumbs(newCrumbs);
      navigate(-1)
    } else {
      console.log('parentId', parentId);
      setCurrentDir(parentId);
    }
  };

  return (
    <FolderContainer>
      {filesReducer.fileInfo._id}
      <br />
      {currentDir}
      { parentId !== '' && (
        <FolderItem onClick={() => { setFolderBackwardChange() }}>
          <FaEllipsisH size={30}/>
        </FolderItem>
      )}
      { parentId === '' && (
        <FolderItem>
          <FaPlus size={30}/>
        </FolderItem>
      )}
      {filteredFiles.map(file => (
        <FolderItem
          onClick={() => setFolderForwardChange(file)}
          key={file._id}
          disabled={(!isPage && filesReducer.fileInfo._id === currentDir)}
        >
          {file.fileType === 'folder' ? <FaRegFolder size={30}/> : <FaRegFile size={30}/>}
          {file.name}
        </FolderItem>
      ))}
    </FolderContainer>
  );
};

Folder.defaultProps = {
  files: [],
};

Folder.propTypes = {
  files: PropTypes.array
}

export default Folder;