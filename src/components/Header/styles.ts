import styled from "styled-components";

export const HeaderContainer = styled.header`
    background-color: var(--blue);
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 1.5rem 1rem 12rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        height: 3rem;

        font-size: 1rem;
        color: #ffff;
        background-color: var(--blue-light);

        padding: 0 2rem;
        border: none;
        border-radius: 0.25rem;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;