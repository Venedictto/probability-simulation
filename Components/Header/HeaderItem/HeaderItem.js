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
    margin:1rem;
    margin-top: 25%;
`;
const SubmenuItems = styled.div`
    width:200px;
    background-color:${props => props.theme.color.primaryDarkColor};
    border-radius:8px;
    display:flex;
    flex-direction:column;
    position:absolute;
    top:${props => `${props.theme.header.height}px`};
    padding:1rem;
`;
const Triangle = styled.div`
    width: 0;
    height: 0;
    margin-left: 20px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid ${props => props.theme.color.primaryDarkColor};
`;
const SubtitleItem = styled.div`
    color:black;
    font-size: ${props => props.theme.font.size.text};
    font-family:${props => props.theme.font.family};
    color: white;
    padding:0.5rem 0rem 0.5rem 0rem;
    &:hover{
        color:${props => props.theme.color.primaryLightColor};
    }
`;

const HeaderSubmenuItem = styled.div`
    display:flex;
    flex-direction:column;
`

const HeaderItem = (props) => {
    const [IsDisplayed, setIsDisplayed] = useState(true);

    const renderSubitems = useCallback((subItems)=> {
        return subItems.map((subItem, index) => {
             return (
                <Link key={index} href={subItem.url} >
                    <SubtitleItem>
                        {subItem.name}
                    </SubtitleItem>
                </Link>
             );
        })
    }, [])

    return (
        <HeaderSubmenuItem>
            <HeaderItemButton onClick={() => setIsDisplayed(!IsDisplayed)}>
                <Link href={props.url} >
                    <TextButton>
                        {props.name}
                    </TextButton>
                </Link>
            </HeaderItemButton> 
            {
                (IsDisplayed !== false && props.url === '') &&
                    (<>
                        <Triangle/>
                        <SubmenuItems onClick={() => setIsDisplayed(false)}>
                            {renderSubitems(props.subItems)}
                        </SubmenuItems>
                    </>)
            }
        </HeaderSubmenuItem> 
    )
}


export default HeaderItem


