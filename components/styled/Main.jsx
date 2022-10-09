import styled from 'styled-components';

export const Main = styled.div`
    background-color: var(--lightGreyColor);
    border-radius: 12px;
    padding: 20px;
    flex: 1 1 auto;
    @media (max-width: 1280px) {
        margin: 0 -20px;
        border-radius: 0;
    }
`;
