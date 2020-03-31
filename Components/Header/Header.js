import React, {useCallback} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import HeaderItem from './HeaderItem/HeaderItem';

const HeaderContainer = styled.div`
    cursor:pointer;
    display:flex;
    flex-direction: row;
    height:${props => `${props.theme.header.height}px`};
    background-color:${props => props.theme.color.primaryColor};
    width:100%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
`;
const HeaderText = styled.div`
    padding:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.tittle};
    color:white;
    border-right: 5px solid ${props => props.theme.color.primaryDarkColor};
`;

const Header = () => {

    const renderMenu = useCallback(
            () => { 
                return menu.map((item,index) => <HeaderItem key={`${item.name}-${index}`} name={item.name} url={item.url} subItems={item.subItems}/>)
            },[]);
            
    return (
        <HeaderContainer>
            <HeaderText>
                Simulator
            </HeaderText>
            {renderMenu()}
        </HeaderContainer>
    )
}

const menu = 
    [
        {
            name: 'Coins',
            url: '',
            subItems: [
                    {   name: 'Flip coin experiment', url: './FlipCoinSimulator'},
                    {   name: 'Flip coin until experiment', url: './FlipCoinUntilSimulator'}
                ]
        },
        {
            name: 'Dices',
            url: './RollDiceSimulator',
            subItems: [],
        },
        
    ]


export default Header


