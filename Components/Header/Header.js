import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import HeaderItem from './HeaderItem/HeaderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

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
    box-shadow: 0 20px 40px 0 rgba(0,0,0,0.2);
    @media (max-width: 768px) {
        justify-content:space-between;
    }


`;
const HeaderText = styled.div`
    padding:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.tittle};
    color:white;
    border-right: 5px solid ${props => props.theme.color.primaryDarkColor};
`;
const ToolBarMenu = styled.div`
    display:flex;
    flex-direction:row;
    @media (max-width: 768px) {
        display:none;
    }
`;
const SideBarMenu = styled.div`
    display:none;
    @media (max-width: 768px) {
        display:flex;
    }
`;
const BurgerButton = styled(FontAwesomeIcon)`
    font-size: 50px;
    color: ${props => props.theme.color.primaryDarkColor};
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
    margin-top: ${props => `${(props.theme.header.height/4)}px`};
    margin-right:1rem;
`;
const LeftSideMenu = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    height:100%;
    max-width:150px;
    background-color:gray;
    box-shadow: 0 20px 40px 0 rgba(0,0,0,0.2);
`;
const LeftSideMenuBackground = styled.div`
    position:absolute;
    left:0px;
    z-index:1;
    top: 100px;
    height:100%;
    width: 100%;
    background-color:rgba(0,0,0,0.2);
`;

const Header = () => {
    const [LeftSideMenuIsDisplayed, setLeftSideMenuIsDisplayed] = useState(false);
    const [ActiveIndex, setActiveIndex] = useState(0);

    const renderMenu = useCallback(
            (ActiveIndex) => { 
                return menu.map((item,index) => 
                    <HeaderItem 
                        key={`${item.name}-${index}`}
                        name={item.name}
                        url={item.url}
                        onItemClick={setActiveIndex}
                        index={index}
                        activeIndex={ActiveIndex}
                    />)
            },[]);
            
    return (
        <HeaderContainer>
            <Link href={'./index'}>
                <HeaderText>
                    Simulator
                </HeaderText>
            </Link>
            <ToolBarMenu>
                {renderMenu(ActiveIndex)}
            </ToolBarMenu>
            <SideBarMenu>
                <BurgerButton icon={faBars} onClick={() => setLeftSideMenuIsDisplayed(!LeftSideMenuIsDisplayed)} />
                {
                    LeftSideMenuIsDisplayed &&
                    <LeftSideMenuBackground onClick={() => setLeftSideMenuIsDisplayed(false)}>
                        <LeftSideMenu>
                                {renderMenu(ActiveIndex)}
                        </LeftSideMenu>
                    </LeftSideMenuBackground>
                }
            </SideBarMenu>
        </HeaderContainer>
    )
}

const menu = 
    [
        {   name: 'Bernoulli',  url: './bernoulliSimulator'},
        {   name: 'Geomatric',  url: './geometricSimulator'},
        {   name: 'Binomial',   url: './binomialSimulator'},
        {   name: 'Pascal',     url: './pascalSimulator'},
    ]


export default Header


