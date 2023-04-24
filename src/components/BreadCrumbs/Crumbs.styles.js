import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const CrumbsContainer = styled.li`
  display: flex;
  line-height: 1;
  cursor: pointer;
`;

const StyledRightArrow = styled(FaChevronRight)`
  margin: 0 5px;
`;

const StyledLink = styled(Link)`
  color: #555;
  display: flex;
  text-decoration: none;
`

export {
  CrumbsContainer,
  StyledRightArrow,
  StyledLink,
};