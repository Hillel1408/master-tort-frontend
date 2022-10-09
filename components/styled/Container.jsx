import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1880px;
    margin: 0 auto;
    display: flex;
    padding-top: 13px;
    padding-bottom: 40px;
    height: 100%;
    @media (max-width: 1920px) {
        max-width: none;
        padding: 13px 20px 40px 20px;
        flex-direction: column;
    }
`;
