import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  customStyles,
  StyledCloseButton,
  StyledActionBar,
  StyledInput,
} from './InputModal.styles';

const InputModal = ({ isOpen, onClose, onConfirm, text='', subText=''}) => {

  const [fileName, setFileName] = useState('');

  const handleOnChange = (event) => {
    setFileName(event.target.value);
  }
  
  const handleOnClose = () => {
    onClose();
  }

  const handleOnConfirm = () => {
    onConfirm(fileName);
    setFileName('');
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
      <StyledInput value={fileName} onChange={(e) => { handleOnChange(e) }} />
      <StyledActionBar>
        <button onClick={handleOnConfirm}> Ok </button>
      </StyledActionBar>
    </Modal>
  );
}

export default InputModal;