import styled from 'styled-components';

const SidebarBlock = styled.aside`
    min-width: 280px;
    @media (max-width: 1920px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`;
const Logo = styled.div`
    margin-bottom: 29px;
    @media (max-width: 1920px) {
        margin-bottom: 0;
    }
    img {
        margin-right: 10px;
    }
`;
const LogoLink = styled.a`
    display: flex;
    align-items: center;
`;
const SidebarNav = styled.div``;
const SidebarNavIcon = styled.div`
    display: none;
    @media (max-width: 1920px) {
        display: block;
        position: relative;
        width: 20px;
        height: 16px;
        cursor: pointer;
        z-index: 3;
        span {
            transition: all 0.3s ease 0s;
            top: calc(50% - 1px);
            left: 0px;
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: var(--textColor);
            &:first-child {
                top: 0px;
            }
            &:last-child {
                top: auto;
                bottom: 0px;
            }
        }
        &.active {
            span {
                transform: scale(0);
                &:first-child {
                    transform: rotate(-45deg);
                    top: calc(50% - 1px);
                }
                &:last-child {
                    transform: rotate(45deg);
                    bottom: calc(50% - 1px);
                }
            }
        }
    }
`;
const SidebarNavList = styled.ul`
    @media (max-width: 1920px) {
        transform: translate(320px, 0);
        transition: all 0.5s ease 0s;
        position: fixed;
        width: 320px;
        height: 100%;
        top: 0;
        right: 0;
        overflow: auto;
        padding: 89px 23px;
        background-color: var(--secondaryColor);
        z-index: 2;
        &.active {
            transform: translate(0px, 0%);
        }
    }
`;
const SidebarNavItem = styled.li``;
const SidebarNavLink = styled.a`
    display: flex;
    align-items: center;
    padding: 11px 23px;
    transition: all 0.3s ease 0s;
    @media (any-hover: hover) {
        &:hover {
            color: var(--mainColor);
        }
    }
    &.active {
        color: var(--mainColor);
    }
    @media (max-width: 1920px) {
        padding: 11px 0;
    }
    i {
        width: 20px;
        margin-right: 12px;
        display: inline-flex;
        justify-content: center;
    }
`;

function Sidebar() {
    return (
        <SidebarBlock>
            <Logo>
                <LogoLink className="text" href="/">
                    <img src="/logo.svg" alt="" />
                    Помощник кондитеру
                </LogoLink>
            </Logo>
            <SidebarNav>
                <SidebarNavIcon>
                    <span></span>
                    <span></span>
                    <span></span>
                </SidebarNavIcon>
                <SidebarNavList>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-1"></i>Заказы
                        </SidebarNavLink>
                    </SidebarNavItem>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-2"></i>Расчет торта
                        </SidebarNavLink>
                    </SidebarNavItem>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-3"></i>Продукты
                        </SidebarNavLink>
                    </SidebarNavItem>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-4"></i>Закупка
                        </SidebarNavLink>
                    </SidebarNavItem>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-5"></i>Мои рецепты
                        </SidebarNavLink>
                    </SidebarNavItem>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-6"></i>Блог
                        </SidebarNavLink>
                    </SidebarNavItem>
                    <SidebarNavItem>
                        <SidebarNavLink className="text" href="#">
                            <i className="icon-7"></i>Настройки
                        </SidebarNavLink>
                    </SidebarNavItem>
                </SidebarNavList>
            </SidebarNav>
        </SidebarBlock>
    );
}

export { Sidebar };
