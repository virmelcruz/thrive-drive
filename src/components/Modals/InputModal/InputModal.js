import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  customStyles,
  StyledCloseButton,
  StyledActionBar,
} from './InputModal.styles';

const InputModal = ({ isOpen, onClose, text='', subText=''}) => {

  const [fileName, setFileName] = useState('');

  const handleOnChange = (event) => {
    setFileName(event.target.value);
  }
  
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
      <input value={fileName} onChange={(e) => { handleOnChange(e) }} />
      <StyledActionBar>
        <button onClick={handleOnClose}> Ok </button>
      </StyledActionBar>
    </Modal>
  );
}

export default InputModal;