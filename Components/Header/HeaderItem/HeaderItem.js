// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderItemButton = styled.div`
    height:100%;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    color:white;
    &:hover{
        color:${props => props.theme.color.primaryLightColor};
    }
`;

const TextButton = styled.div`
    display:flex;
    margin-top: ${props => `${(props.theme.header.height/5)}px`};
    border-bottom: ${props => props.isActive ? `unset` : 'unset'};
`;

const HeaderSubmenuItem = styled.div`
    padding:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.title};
    color:white;
    display:flex;
    flex-direction:column;
`

const HeaderItem = (props) => {
    const {url, name, onItemClick, index, activeIndex} = props;
    return (
        <HeaderSubmenuItem >
            <Link href={url} >
                <HeaderItemButton>
                        <TextButton onClick={() => onItemClick(index)} isActive={index === activeIndex}>
                            {name}
                        </TextButton>
                </HeaderItemButton>
            </Link>
        </HeaderSubmenuItem> 
    )
}


export default HeaderItem


