import React, { useEffect, useContext } from 'react';
import Folder from '../../components/Folder';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const DirectoryPage = () => {
  const location = useLocation();
  const { filesReducer, lastCrumb } = useContext(AppContext);

  useEffect(() => {
    filesReducer.getFiles(lastCrumb._id);
  }, [location])

  return (
    <Folder files={filesReducer.results} parentId={filesReducer.fileInfo.parentId} isPage/>
  );
};

export default DirectoryPage;