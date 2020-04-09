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
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    @media (max-width: 768px) {
        justify-content:space-between;
    }
`;
const HeaderText = styled.div`
    padding:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.title};
    color:${props => props.theme.color.white};
    border-right: 5px solid ${props => props.theme.color.primaryDarkColor};
`;
const ToolBarMenu = styled.div`
    display:flex;
    flex-direction:row;
    @media (max-width: 768px) {
        display:none;
    }
`;
const BurgerButton = styled(FontAwesomeIcon)`
    font-size: 50px;
    color: ${props => props.theme.color.primaryDarkColor};
    display:none;
    @media (max-width: 768px) {
        display:unset;
    }
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
    margin-top: ${props => `${(props.theme.header.height/4)}px`};
    margin-right:1rem;
`;

const SideBarMenu = styled.div`
    display:none;
    position:absolute;
    left:0px;
    top:100px;
    height:100%;
    width:100%;
    @media (max-width: 768px) {
        display:flex;
        flex-direction:row;
    }
`;
const LeftSideMenu = styled.div`
    position:relative;
    right:0px;
    top:0px;
    display:flex;
    flex-direction:column;
    background-color:${props => props.theme.color.gray};
    box-shadow: 0 20px 40px 0 rgba(0,0,0,0.2);
`;
const LeftSideMenuBackground = styled.div`
    position:relative;
    left:0px;
    top:0px;
    width:80%;
    z-index:100;
    background-color:rgba(0,0,0,0.2);
`;

const Header = () => {
    const [LeftSideMenuIsDisplayed, setLeftSideMenuIsDisplayed] = useState(false);

    const renderMenu = useCallback(
            (ActiveIndex) => { 
                return menu.map((item,index) => 
                    <HeaderItem 
                        key={`${item.name}-${index}`}
                        name={item.name}
                        url={item.url}
                        onItemClick={() => {setLeftSideMenuIsDisplayed(false)} }
                        activeIndex={ActiveIndex}
                    />)
            },[]);
            
    return (
        <>
            <HeaderContainer>
                <Link href={'./index'}>
                    <HeaderText>
                        Simulator
                    </HeaderText>
                </Link>
                <ToolBarMenu>
                    {renderMenu()}
                </ToolBarMenu>
                <BurgerButton icon={faBars} onClick={() => setLeftSideMenuIsDisplayed(!LeftSideMenuIsDisplayed)} />
            </HeaderContainer>
                {
                    LeftSideMenuIsDisplayed &&
                    <SideBarMenu>
                        <LeftSideMenu>
                            {renderMenu()}
                        </LeftSideMenu>
                        <LeftSideMenuBackground onClick={() => setLeftSideMenuIsDisplayed(false)} />
                    </SideBarMenu>
                }
        </>
    )
}

const menu = 
    [
        {   name: 'Bernoulli',  url: './bernoulliSimulator'},
        {   name: 'Geometric',  url: './geometricSimulator'},
        {   name: 'Binomial',   url: './binomialSimulator'},
        {   name: 'Pascal',     url: './pascalSimulator'},
    ]


export default Header


