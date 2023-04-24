import React, { useEffect, useContext } from 'react';
import Crumbs from './Crumbs';
import { BreadCrumbsContainer } from './BreadCrumbs.styles';
import CrumbsMenu from './CrumbsMenu';
import { AppContext } from '../../AppContext';

const BreadCrumbs = () => {
  const { breadCrumbs } = useContext(AppContext);

  return (
    <>
      <BreadCrumbsContainer>
        {breadCrumbs.length && breadCrumbs.map(crumb => <Crumbs {...crumb} key={crumb.name}/>)}
      </BreadCrumbsContainer>
      <CrumbsMenu />
    </>
  );

};

export default BreadCrumbs;