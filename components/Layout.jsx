import { Sidebar } from '../components/Sidebar';
import stylesHeader from '../components/Header/Header.module.scss';
import { Oval } from 'react-loader-spinner';
import { NoAccess } from '../components/NoAccess';
import stylesLogin from '../pages/login/Login.module.scss';
import { Header } from '../components/Header';
import classNames from 'classnames';

const Layout = ({ children, isAuth, setIsAuth, dataUser }) => (
    <div className={classNames('wrapper', 'container')}>
        <Sidebar />
        <div className="content">
            <header className={stylesHeader.root}>
                <h1 className={classNames('title', stylesHeader.title)}>
                    Продукты
                </h1>
                {isAuth !== '' ? (
                    <Header
                        userName={dataUser.fullName}
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}
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
            <br></br>
            <br></br>
        </div>
    </div>
);

export default Layout;
