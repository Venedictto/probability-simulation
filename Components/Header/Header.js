import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.div`
    cursor:pointer;
    display:flex;
    flex-direction: row;
    height:100px;
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
const HeaderButton = styled.div`
    height:100%;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    color:white;
    &:hover{
        background-color:${props => props.theme.color.primaryLightColor};
        color:black;
    }
`;
const TextButton = styled.div`
    display:flex;
    margin:1rem;
    margin-top: 25%;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderText>
                Simulator
            </HeaderText>
            <Link href={'./FlipCoinSimulator'}>
                <HeaderButton>
                    <TextButton>
                        Flip Coin 
                    </TextButton>
                </HeaderButton>   
            </Link>
            <Link href={'./RollDiceSimulator'}>
                <HeaderButton>
                    <TextButton>
                        Roll Dice
                    </TextButton>
                </HeaderButton>
            </Link>
        </HeaderContainer>
    )
}


export default Header


