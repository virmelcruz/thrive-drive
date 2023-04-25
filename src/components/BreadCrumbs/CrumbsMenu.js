import React, { useState, useContext } from 'react';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { FaEllipsisV } from 'react-icons/fa'
import { StyledMenuBtn } from './CrumbsMenu.styles';
import { ConfirmationModal, InputModal, DirectoryModal } from '../Modals'
import { useAppState, AppContext } from '../../AppContext';

const CrumbsMenu = () => {
  const { breadCrumbs = [], filesReducer } = useContext(AppContext);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState('');
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);
  const lastCrumb = breadCrumbs.slice(-1)[0];

  const menuItem = [{
    label: 'Add Location',
    onClick: () => { handleInputModalOpen('folder:create') },
  }, {
    label: 'Add Book',
    onClick: () => { handleInputModalOpen('file:create') },
  }];

  if (breadCrumbs.length > 1) {
    menuItem.push({
      label: 'Move',
      onClick: () => { setIsDirectoryModalOpen(true) },
    }, {
      label: 'Delete Location',
      onClick: () => {},
    });
  }

  const handleConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(true);
  }

  const handleInputModalOpen = (operation) => {
    setIsInputModalOpen(operation);
  }

  const handleInputModalConfirm = (fileName) => {
    const crumbsPath = breadCrumbs.map(({ _id, name }) => `${name}:${_id}`).join('/');
    filesReducer.createFiles({
      name: fileName,
      parentId: lastCrumb._id,
      path: crumbsPath,
      fileType: isInputModalOpen.split(':')[0],
    });
    setIsInputModalOpen('');
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
        text={isInputModalOpen === 'folder' ? 'New Folder' : 'File Name'}
        isOpen={!!isInputModalOpen}
        onClose={() => { setIsInputModalOpen('') }}
        onConfirm={handleInputModalConfirm}
      />
      <DirectoryModal
        text="Select new location"
        isOpen={isDirectoryModalOpen}
        onClose={() => { setIsDirectoryModalOpen(false) }}
      />
    </>
  );
}

export default CrumbsMenu;