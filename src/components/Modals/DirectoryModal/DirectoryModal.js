import React, { useEffect, useContext, } from 'react';
import Modal from 'react-modal';
import { customStyles, StyledCloseButton, StyledActionBar } from './DirectoryModal.styles';
import Folder from '../../Folder';
import useAppReducer from '../../../useAppReducer';
import { AppContext } from '../../../AppContext';
import { useParams } from 'react-router-dom';

const DirectoryModal = ({ isOpen, onClose, text='', subText='', onConfirm }) => {
  const { filesReducer, currentDir, setCurrentDir } = useContext(AppContext);
  const { getFiles, results, fileInfo } = useAppReducer();

  useEffect(() => {
    getFiles(currentDir);
  }, [isOpen, currentDir]);
  
  const handleOnClose = () => {
    setCurrentDir('home');
    onClose();
  }

  const handleOnConfirm = () => {
    onConfirm(currentDir);
    handleOnClose();
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
      <Folder files={results} parentId={fileInfo.parentId} isPage={false} />
      <StyledActionBar>
        <button onClick={handleOnConfirm} disabled={currentDir === filesReducer.fileInfo._id}> Ok </button>
      </StyledActionBar>
    </Modal>
  );
}

export default DirectoryModal;