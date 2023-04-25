import React, { useContext } from 'react';
import { CrumbsContainer, StyledRightArrow, StyledLink } from './Crumbs.styles';
import { AppContext } from '../../AppContext';

const Crumbs = ({ name = '', hasChild = false, _id='', index }) => {
    const redirectTo = _id === 'home' ? '/' : `/folders/${_id}`;
    const { jumpCrumbs, resetCrumbs } = useContext(AppContext);

    const handleJump = () => {
        if(_id === 'home') {
            resetCrumbs();
        } else {
            jumpCrumbs(_id, index);
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