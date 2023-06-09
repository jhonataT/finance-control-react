import styled from "styled-components";
import { darken, transparentize } from 'polished';

interface RadioBoxProps {
    isActive: boolean;
    activeColor: 'green' | 'red';
};

const colors = {
    green: '#33cc95',
    red: '#e52e4d'
}

export const ModalContainer = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input {
        height: 4rem;
        width: 100%;
        padding: 0 1.5rem;
        border-radius: 0.25rem;

        background-color: var(--input-background);
        border: 1px solid var(--border-color);

        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            color: var(--text-body);
        }

        & + input {
            margin-top: 1rem;
        }
    }

    button[type="submit"] {
        height: 4rem;
        width: 100%;

        padding: 0 1.5rem;
        border: none;
        border-radius: .25rem;
        margin-top: 1.5rem;

        background-color: var(--green);
        color: var(--shape);
        font-size: 1rem;
        font-weight: 600;

        transition: filter .2s;

        &:hover {
            filter: brightness(.9);
        }
    }

`;

export const TransactionTypeContainer = styled.div`
    margin: 1rem 0;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;

export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    border: 1px solid var(--border-color);
    border-radius: .25rem;

    background-color: ${(props) => props.isActive
    ? transparentize(.9, colors[props.activeColor])
    : 'transparent'
    };

    display: flex;
    align-items: center;
    justify-content: center;

    transition: border-color .2s;

    &:hover {
        border-color: ${darken(.1, "#d7d7d7")};
    }

    img {
        height: 20px;
        width: 20px;
    }

    span {
        display: inline-block;
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-title);
    }
`;