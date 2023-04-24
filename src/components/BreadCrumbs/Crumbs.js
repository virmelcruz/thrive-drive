import React, { useContext } from 'react';
import { CrumbsContainer, StyledRightArrow, StyledLink } from './Crumbs.styles';
import { AppContext } from '../../AppContext';

const Crumbs = ({ name = '', hasChild = false, id='', index }) => {
    const redirectTo = name === 'Home' ? '/' : `/folders/${id}`;
    const { jumpCrumbs, resetCrumbs } = useContext(AppContext);

    const handleJump = () => {
        if(name === 'Home') {
            resetCrumbs();
        } else {
            jumpCrumbs(id, index);
        }
    };

    return (
        <CrumbsContainer>
            <StyledLink to={redirectTo} onClick={handleJump}>
                { name }
                { hasChild ? <StyledRightArrow /> : ''}
            </StyledLink>
        </CrumbsContainer>
    )

}

export default Crumbs;