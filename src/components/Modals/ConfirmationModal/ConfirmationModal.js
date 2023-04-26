import React from 'react';
import Modal from 'react-modal';
import { customStyles, StyledCloseButton, StyledActionBar } from './ConfirmationModal.styles';

const ConfirmationModal = ({ isOpen, onClose, text='', subText='', onConfirm}) => {
  
  const handleOnClose = () => {
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
      <div>{subText}</div>
      <StyledActionBar>
        <button onClick={onConfirm}> Ok </button>
      </StyledActionBar>
    </Modal>
  );
}

export default ConfirmationModal;