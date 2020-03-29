import React, {useCallback} from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
    background-color: white;
    padding: 2rem;
    flex-direction:column;
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
