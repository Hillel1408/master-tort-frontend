import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import stylesTable from '../../components/Table/Table.module.scss';
import { useEffect, useState } from 'react';
import stylesHeader from '../../components/Header/Header.module.scss';
import { Oval } from 'react-loader-spinner';
import AuthService from '../../services/AuthService';
import stylesLogin from '../login/Login.module.scss';
import { NoAccess } from '../../components/NoAccess';
import { Tr } from '../../components/pages/products/Tr';

export default function Products() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [tr, setTr] = useState([]);

    const trValue = {
        name: '',
        measure: [
            { value: 'kg', label: 'кг.' },
            { value: 'gr', label: 'гр.' },
            { value: 'count', label: 'штук' },
        ],
        packageKg: '',
        packageGr: '',
        price: '',
    };

    useEffect(() => {
        setTr([...tr, trValue]);
    }, []);

    const thTitle = [
        'Наименование',
        'Единица измерения',
        'Упаковка кг.',
        'Упаковка гр.',
        'Цена, ₽',
    ];

    const clickHandler = () => {
        setTr([...tr, trValue]);
    };

    useEffect(() => {
        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setIsAuth(true);
                setDataUser(response.data.user);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
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
                            <>
                                <div className={stylesTable.overflow}>
                                    <div
                                        className={classNames(
                                            stylesTable.table,
                                            'small-text'
                                        )}
                                        style={{
                                            minWidth: '545px',
                                            color: 'var(--textColor)',
                                        }}
                                    >
                                        <div
                                            className={stylesTable.wrapperHead}
                                        >
                                            <div
                                                className={classNames(
                                                    'text',
                                                    stylesTable.thead
                                                )}
                                                style={{
                                                    gridTemplateColumns:
                                                        '20% 20% 20% 20% 20%',
                                                }}
                                            >
                                                {thTitle.map((item) => (
                                                    <div
                                                        className={
                                                            stylesTable.th
                                                        }
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            <div
                                                className={stylesTable.th}
                                                style={{ width: '22px' }}
                                            ></div>
                                        </div>
                                        <div className={stylesTable.tbody}>
                                            {tr.length > 0 &&
                                                tr.map((item, index) => (
                                                    <Tr
                                                        item={item}
                                                        tr={tr}
                                                        index={index}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="addBlock"
                                    onClick={() => clickHandler()}
                                >
                                    <span
                                        className={classNames(
                                            'small-text',
                                            'icon-8'
                                        )}
                                    >
                                        Добавить продукт
                                    </span>
                                </div>
                            </>
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
}
