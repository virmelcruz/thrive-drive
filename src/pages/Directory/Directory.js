import React from 'react';
import Folder from '../../components/Folder';
import { useParams } from 'react-router-dom';
import useAppReducer from '../../useAppReducer';
import { useLocation } from 'react-router-dom';

const DirectoryPage = () => {
  const { folderId } = useParams();
  let files = useAppReducer(folderId);

  return (
    <Folder files={files.results}/>
  );
};

export default DirectoryPage;