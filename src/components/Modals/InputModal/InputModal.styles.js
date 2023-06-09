import styled from 'styled-components';
import { FaRegWindowClose } from 'react-icons/fa'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const StyledCloseButton = styled(FaRegWindowClose)`
  position: absolute;
  top: 5px;
  right: 5px;  
  cursor: pointer;
`

const StyledActionBar = styled.div`
  display: flex;
  justify-content: right;
`

const StyledInput = styled.input`
  border: 1px solid #555;
  border-radius: 3px;
  width: 250px;
  height: 20px;
  margin: 10px 0;
`

export {
  customStyles,
  StyledCloseButton,
  StyledActionBar,
  StyledInput,
}