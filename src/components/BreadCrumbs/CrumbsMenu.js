import React, { useState } from 'react';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { FaEllipsisV } from 'react-icons/fa'
import { StyledMenuBtn } from './CrumbsMenu.styles';
import { ConfirmationModal, InputModal } from '../Modals'
import { useAppState } from '../../AppContext';


const CrumbsMenu = () => {
  const { breadCrumbs = [] } = useAppState();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const menuItem = [{
    label: 'Add Location',
    onClick: () => { handleConfirmationModalOpen() },
  }, {
    label: 'Add Book',
    onClick: () => { handleInputModalOpen() },
  }];

  if (breadCrumbs.length > 1) {
    menuItem.push({
      label: 'Delete Location',
      onClick: () => {},
    });
  }

  const handleConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(true);
  }

  const handleInputModalOpen = () => {
    setIsInputModalOpen(true);
  }

  return (
    <>
      <Menu menuButton={<StyledMenuBtn> <FaEllipsisV /> </StyledMenuBtn>} transition>
        {menuItem.map(menu => (<MenuItem onClick={menu.onClick} key={menu.label}>{menu.label}</MenuItem>))}
      </Menu>
      <ConfirmationModal
        text="Are you sure you want to delete?"
        isOpen={isConfirmationModalOpen}
        onClose={() => { setIsConfirmationModalOpen(false) }}
      />
      <InputModal
        text="New Folder"
        isOpen={isInputModalOpen}
        onClose={() => { setIsInputModalOpen(false) }}
      />
    </>
  );
}

export default CrumbsMenu;