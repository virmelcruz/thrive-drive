import React, { useEffect, useContext } from 'react';
import Folder from '../../components/Folder';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const DirectoryPage = () => {
  const location = useLocation();
  const { filesReducer, lastCrumb } = useContext(AppContext);

  useEffect(() => {
    console.log('nag fetch ng file sa Directory', filesReducer);
    filesReducer.getFiles(lastCrumb._id);
  }, [location])

  return (
    <Folder files={filesReducer.results} parentId={filesReducer.parentId} isPage/>
  );
};

export default DirectoryPage;