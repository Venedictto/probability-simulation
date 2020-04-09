// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderItemButton = styled.div`
    height:100%;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    color:${props => props.theme.color.white};
    &:hover{
        color:${props => props.theme.color.primaryLightColor};
        @media (max-width: 768px) {
        color:${props => props.theme.color.primaryDarkColor};
        }
    }
`;

const TextButton = styled.div`
    display:flex;
    margin-top: ${props => `${(props.theme.header.height/5)}px`};
`;

const HeaderSubmenuItem = styled.div`
    padding:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.title};
    color:${props => props.theme.color.white};
    display:flex;
    flex-direction:column;
    cursor:pointer;
`

const HeaderItem = (props) => {
    const {url, name, onItemClick, activeIndex} = props;
    return (
        <HeaderSubmenuItem >
            <Link href={url} >
                <HeaderItemButton>
                        <TextButton onClick={() => onItemClick()}>
                            {name}
                        </TextButton>
                </HeaderItemButton>
            </Link>
        </HeaderSubmenuItem> 
    )
}


export default HeaderItem


