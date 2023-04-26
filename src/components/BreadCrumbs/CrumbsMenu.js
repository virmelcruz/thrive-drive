import React, { useState, useContext } from 'react';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { FaEllipsisV } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { StyledMenuBtn } from './CrumbsMenu.styles';
import { ConfirmationModal, InputModal, DirectoryModal } from '../Modals';
import { AppContext } from '../../AppContext';

const CrumbsMenu = () => {
  const { breadCrumbs = [], filesReducer, jumpCrumbs } = useContext(AppContext);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState('');
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);
  const lastCrumb = breadCrumbs.slice(-1)[0];
  const navigate = useNavigate();

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
      onClick: () => { 
        setIsDirectoryModalOpen(true);
      },
    }, {
      label: 'Delete',
      onClick: () => {
        setIsConfirmationModalOpen(true);
      },
    });
  }

  const handleInputModalOpen = (operation) => {
    setIsInputModalOpen(operation);
  }

  const handleInputModalConfirm = (fileName) => {
    const crumbsPath = breadCrumbs.map(({ _id, name }) => `${name}:${_id}`).join('/');
    filesReducer.createUpdateFiles({
      name: fileName,
      parentId: lastCrumb._id,
      path: crumbsPath,
      fileType: isInputModalOpen.split(':')[0],
    });
    setIsInputModalOpen('');
  }

  const handleDirectoryModalConfirm = (parentId) => {
    filesReducer.createUpdateFiles({
      ...filesReducer.fileInfo,
      parentId,
    }, 'patch');
    setIsDirectoryModalOpen(false);
  }

  const handleDelete = () => {
    filesReducer.deleteFile(lastCrumb._id);
    setIsConfirmationModalOpen(false);
    navigate(`/folders/${lastCrumb.parentId}`);
    jumpCrumbs(lastCrumb.parentId, lastCrumb.index - 1);
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
        onConfirm={handleDelete}
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
        onConfirm={handleDirectoryModalConfirm}
      />
    </>
  );
}

export default CrumbsMenu;