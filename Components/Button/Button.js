import styled from 'styled-components';

const Button = styled.button`
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    min-width:200px;
    width:10vw;
    color: ${props => props.theme.color.primaryDarkColor};
    border: 2px solid ${props => props.theme.color.primaryDarkColor};
    background-color: ${props => props.theme.color.primaryColor};
    font-size: ${props => props.theme.font.size.text};
    font-weight:${props => props.theme.font.weight.bold};
    &:hover{
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryLightColor};
    }
    &:focus {
        outline: unset;
    }
    &:disabled {
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
export default Button;