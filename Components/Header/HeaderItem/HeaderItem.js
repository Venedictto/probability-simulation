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
`;

const HeaderSubmenuItem = styled.div`
    padding:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.tittle};
    color:white;
    display:flex;
    flex-direction:column;
`

const HeaderItem = (props) => {
    const {url, name} = props;
    return (
        <HeaderSubmenuItem>
            <HeaderItemButton>
                <Link href={url} >
                    <TextButton>
                        {name}
                    </TextButton>
                </Link>
            </HeaderItemButton>
        </HeaderSubmenuItem> 
    )
}


export default HeaderItem


