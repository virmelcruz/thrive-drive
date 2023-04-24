import React, { useEffect, useContext } from 'react';
import { FolderContainer, FolderItem, FolderLinkItem } from './Folder.styles';
import { FaRegFolder, FaPlus, FaRegFile, FaEllipsisH } from 'react-icons/fa'
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppState, AppContext } from '../../AppContext';

const Folder = ({ files }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { breadCrumbs, setIncreaseCrumbs, setDecreaseCrumbs } = useContext(AppContext);
  

  const setBreadCrumbsForwardChange = (file) => {
    console.log('set bread crumbs', file);
    setIncreaseCrumbs([{ name: file.name, hasChild: true, id: file.id, index: breadCrumbs.length + 1}]);
  };

  const setBreadCrumbsBackwardChange = () => {
    const newCrumbs = [...breadCrumbs];
    newCrumbs.pop();
    setDecreaseCrumbs(newCrumbs);
    navigate(-1)
  };

  return (
    <FolderContainer>
      { location.pathname !== '/' && (
        <FolderItem onClick={() => { setBreadCrumbsBackwardChange() }}>
          <FaEllipsisH size={30}/>
        </FolderItem>
      )}
      { location.pathname === '/' && (
        <FolderItem>
          <FaPlus size={30}/>
        </FolderItem>
      )}
      {files.map(file => (
        <FolderLinkItem to={`/folders/${file.id}`} onClick={() => setBreadCrumbsForwardChange(file)} key={file.id}>
          {file.fileType === 'folder' ? <FaRegFolder size={30}/> : <FaRegFile size={30}/>}
          {file.name}
        </FolderLinkItem>
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