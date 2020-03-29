import styled from 'styled-components';

const Input = styled.input`
    margin-top: 1rem;
    min-height:3rem;
    min-width:200px;
    width:10vw;
    border-radius:8px;
    padding: 12px 20px;
    border: 2px solid ${props => props.theme.color.primaryLightColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    box-sizing: border-box;
    line-height: 1.2em;
    height:55px;
    outline: unset;
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.color.primaryDarkColor};
    }
    & ~ label{
        color:${props => props.theme.color.primaryDarkColor};;
        margin-top:-50px;
        margin-left: 10px;
        font-size: 14px;
        font-family: ${props => props.theme.font.family};
    }
`;
export default Input;