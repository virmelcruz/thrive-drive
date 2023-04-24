import React from 'react';
import { HomeContainer } from './Home.styles';
import { Folder } from '../../components'
import useAppReducer from '../../useAppReducer';

const HomePage = () => {
  const files = useAppReducer();
  console.log('files', files);


  return (
    <HomeContainer>
      <Folder files={files.results}/>
    </HomeContainer>
  )
}

export default HomePage;