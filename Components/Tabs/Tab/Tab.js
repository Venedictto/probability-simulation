// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

const TabHeader = styled.div`
  padding-left:10px;
`;

// @ts-ignore
const TabWrapper = styled.li`
  display:flex;
  cursor: pointer;
  width:100%;
  align-content:flex-start;
  padding:1rem;
  font-family: ${props => props.theme.font.family};
  font-weight: ${props => (props.isActive) ? props.theme.font.weight.bold : props.theme.font.weight.normal};
  border-bottom: ${props => (props.isActive) ? `10px solid ${props.theme.color.primaryColor}` : `10px solid white`};
  color: ${props => (props.isActive) ? props.theme.color.primaryColor : `${props.theme.color.black}`};
`;
const Tab = (props) => {
    const { onClick, tabIndex, isActive, title } = props;
    return (
      <TabWrapper isActive={isActive !== undefined ? isActive : false}
                  onClick={() => { onClick && onClick(tabIndex)}}>
        <TabHeader>
          {title}
        </TabHeader>
      </TabWrapper>
    );
}

export default Tab;
