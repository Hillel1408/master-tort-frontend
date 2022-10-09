import styled from 'styled-components';

const HeaderLoginLink = styled.a`
    color: var(--mainColor);
`;
const HeaderLoginSpan = styled.span`
    margin: 0 5px;
    color: var(--mainColor);
`;
const Header = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    margin-top: 7px;
`;

function HeaderBlock({ title }) {
    return (
        <Header>
            <h1 className="title">{title}</h1>
            <div>
                <HeaderLoginLink className="text" href="#">
                    Вход
                </HeaderLoginLink>
                <HeaderLoginSpan className="text">|</HeaderLoginSpan>
                <HeaderLoginLink className="text" href="#">
                    Регистрация
                </HeaderLoginLink>
            </div>
        </Header>
    );
}

export { HeaderBlock };
