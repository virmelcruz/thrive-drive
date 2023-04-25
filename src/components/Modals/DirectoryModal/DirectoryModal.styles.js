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

export {
  customStyles,
  StyledCloseButton,
  StyledActionBar,
}