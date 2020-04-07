import React from 'react';
import styled from 'styled-components';

const ErrorFieldContainer = styled.div`
    color: red;
    border-radius:10px;
    height: 2rem;
    font-weight: ${props => props.theme.font.weight.bold};
`;


const ErrorField = (props) => {
    const {errorMessage} = props;
    return (
        <>
            {
                errorMessage !== '' && 
                <ErrorFieldContainer> ** {errorMessage} </ErrorFieldContainer>
            }    
        </>)
}

export default ErrorField;