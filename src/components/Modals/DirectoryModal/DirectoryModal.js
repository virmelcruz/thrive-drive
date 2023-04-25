import React, { useEffect, useContext, } from 'react';
import Modal from 'react-modal';
import { customStyles, StyledCloseButton, StyledActionBar } from './DirectoryModal.styles';
import Folder from '../../Folder';
import useAppReducer from '../../../useAppReducer';
import { AppContext } from '../../../AppContext';

const DirectoryModal = ({ isOpen, onClose, text='', subText='' }) => {
  const { filesReducer, currentDir, setCurrentDir } = useContext(AppContext);
  const { getFiles, results, parentId } = useAppReducer();

  useEffect(() => {
    console.log('parentId', parentId);
    getFiles(currentDir);
  }, [isOpen, currentDir]);
  
  const handleOnClose = () => {
    setCurrentDir('home');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >
      <StyledCloseButton size={20} onClick={handleOnClose} />
      <h3>
        {text}
      </h3>
      <Folder files={results} parentId={parentId} isPage={false} />
      <StyledActionBar>
        <button onClick={handleOnClose}> Ok </button>
      </StyledActionBar>
    </Modal>
  );
}

export default DirectoryModal;