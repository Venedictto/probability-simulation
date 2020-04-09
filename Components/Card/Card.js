import React, {useCallback} from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    display: flex;
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
    background-color: ${props => props.theme.color.white};
    padding: 2rem;
    border-radius:8px;
    flex-direction:column;
    margin:1rem 0.5rem 1rem 0.5rem;
`;

const Card = ({children}) => {
    const renderCardChildComponents = useCallback(
        (ch) => {
            return React.Children.map(ch, (child) => {
                return React.cloneElement(child);
                });
            }
        , []);
    return (
        <CardWrapper>
            {renderCardChildComponents(children)}
        </CardWrapper>
    );
}

export default Card;
