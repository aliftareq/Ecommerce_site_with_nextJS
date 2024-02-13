import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
    border:0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    svg{
        height: 16px;
    }
    ${props => props?.white && !props.outline && css`
        background-color: #fff;
        color: #000;
    `}
    ${props => props?.white && props.outline && css`
        background-color: transparent;
        color: #fff;
        border: 2px solid #fff;
    `}
    ${props => props?.primary && !props.outline && css`
        background-color: ${primary};
        color: #fff;
        border: 2px solid ${primary};
    `}
    ${props => props?.primary && props.outline && css`
        background-color: transparent;
        color: ${primary};
        border: 2px solid ${primary};
    `}
    ${props => props?.size === 'l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
            margin-right: 5px;
        }
    `}
`
const StyledButton = styled.button`
    ${ButtonStyle}
`

const Button = ({ children, ...rest }) => {
    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    );
};

export default Button;