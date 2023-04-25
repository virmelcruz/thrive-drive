import React, { useEffect, useContext } from 'react';
import { HomeContainer } from './Home.styles';
import { Folder } from '../../components'
import useAppReducer from '../../useAppReducer';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const HomePage = () => {
  const { filesReducer, lastCrumb } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    filesReducer.getFiles(lastCrumb._id);
  }, [location])

  return (
    <HomeContainer>
      <Folder files={filesReducer.results} isPage/>
    </HomeContainer>
  )
}

export default HomePage;