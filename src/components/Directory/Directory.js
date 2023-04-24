import React from 'react';
import { DirectoryContainer, DirectoryHeader, DirectoryBody } from './Directory.styles';
import DirectoryItem from './DirectoryItem';

const Directory = () => {

  const directories = [{
    type: 'folder',
    name: 'Folder 1',
  }, {
    type: 'folder',
    name: 'Folder 2',
  }, {
    type: 'file',
    name: 'File 1',
  }, {
    type: 'File',
    name: 'File 2',
  }]

  return (
    <DirectoryContainer>
      <DirectoryHeader>
        Name
      </DirectoryHeader>
      <DirectoryBody>
        { directories.map(directory => <DirectoryItem {...directory} key={directory.name}/>) }
      </DirectoryBody>
    </DirectoryContainer>
  );

};

export default Directory;