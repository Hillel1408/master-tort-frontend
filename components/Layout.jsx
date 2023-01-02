import { Oval } from 'react-loader-spinner';
import classNames from 'classnames';
import { NoAccess } from '../components/NoAccess';
import { Header } from '../components/Header';
import stylesLogin from '../pages/login/Login.module.scss';
import stylesHeader from '../components/Header/Header.module.scss';

const Layout = ({ children, isAuth, setIsAuth, dataUser, title, isLogin }) => (
    <div className="content">
        <header className={stylesHeader.root}>
            <h1 className={classNames('title', stylesHeader.title)}>{title}</h1>
            {isAuth !== '' ? (
                <Header
                    userName={dataUser.fullName}
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    avatar={dataUser.avatar}
                />
            ) : (
                <Oval
                    height={34}
                    width={34}
                    color="#009998"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#7a7a7a"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            )}
        </header>
        <main className="main">
            {isAuth !== '' ? (
                isAuth ? (
                    isLogin ? (
                        <NoAccess
                            title={'Вы уже авторизованы'}
                            text={
                                'Для того чтобы войти в другой аккаунт сначала выйдите из текущего'
                            }
                            linkBtn={''}
                            textBtn={'Выйти'}
                            isLogin={isLogin}
                            setIsAuth={setIsAuth}
                        />
                    ) : (
                        <>{children}</>
                    )
                ) : isLogin ? (
                    <>{children}</>
                ) : (
                    <NoAccess
                        title={'Доступ закрыт'}
                        text={
                            'Зарегистрируйтесь или войдите в учетную запись, чтобы использовать все возможности сервиса'
                        }
                        linkBtn={'/login'}
                        textBtn={'Войти'}
                    />
                )
            ) : (
                <div className={stylesLogin.wrapper}>
                    <Oval
                        height={40}
                        width={40}
                        color="#009998"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#7a7a7a"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            )}
        </main>
        <div style={{ heigth: '20px' }}>&nbsp;</div>
    </div>
);

export default Layout;
