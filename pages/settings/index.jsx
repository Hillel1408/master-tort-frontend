import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { BodyTable } from './BodyTable';
import { Alert } from '../../components/Alert';
import { setAlert } from '../../redux/cakeSlice';
import { NoAccess } from '../../components/NoAccess';
import AuthService from '../../services/AuthService';
import SettingsService from '../../services/SettingsService';
import { settingsText } from '../../data/settings';
import stylesHeader from '../../components/Header/Header.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Settings.module.scss';
import stylesLogin from '../login/Login.module.scss';

export default function Settings() {
    const [isAuth, setIsAuth] = useState('');
    const [settings, setSettings] = useState('');
    const [dataUser, setDataUser] = useState('');
    const dispatch = useDispatch();

    const saveSettings = async () => {
        try {
            const response = await SettingsService.set({
                ...settings,
                userId: dataUser.id,
            });
            dispatch(
                setAlert({
                    text: 'Настройки успешно сохранены',
                    color: '#62ac62',
                })
            );
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
    };

    const resetSettings = () => {
        const newObj = {};
        Object.keys(settings).map((key) => {
            newObj[key] = ['', ''];
        });
        setSettings(newObj);
    };

    useEffect(() => {
        const getSettings = async (userId) => {
            try {
                const response = await SettingsService.get(userId);
                setSettings(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                setIsAuth(true);
                getSettings(response.data.user.id);
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
                        Настройки
                    </h1>
                    {isAuth !== '' ? (
                        <Header
                            userName={dataUser.fullName}
                            isAuth={isAuth}
                            setIsAuth={setIsAuth}
                        />
                    ) : (
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
                    )}
                </header>
                <main className="main">
                    {isAuth !== '' ? (
                        isAuth ? (
                            <>
                                <div className={styles.info}>
                                    <h2
                                        className={classNames(
                                            'text',
                                            styles.title
                                        )}
                                    >
                                        Информация о настройках
                                    </h2>
                                    <div
                                        className={classNames(
                                            'small-text',
                                            styles.columns
                                        )}
                                    >
                                        <div className={styles.column}>
                                            {settingsText[0].map((item) => (
                                                <p className={styles.text}>
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                        <div className={styles.column}>
                                            {settingsText[1].map((item) => (
                                                <p className={styles.text}>
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.tables}>
                                    <div className={stylesTable.overflow}>
                                        <div
                                            className={classNames(
                                                'table',
                                                'small-text'
                                            )}
                                        >
                                            <div
                                                className={classNames(
                                                    'text',
                                                    stylesTable.thead
                                                )}
                                                style={{
                                                    gridTemplateColumns: '1fr',
                                                }}
                                            >
                                                <div className={stylesTable.th}>
                                                    Проработка толщины мастики
                                                </div>
                                            </div>
                                            <div className={stylesTable.tbody}>
                                                {settings && (
                                                    <BodyTable
                                                        key={Math.random()}
                                                        settings={settings}
                                                        setSettings={
                                                            setSettings
                                                        }
                                                        index="0"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={stylesTable.overflow}>
                                        <div
                                            className={classNames(
                                                'table',
                                                'small-text'
                                            )}
                                        >
                                            <div
                                                className={classNames(
                                                    'text',
                                                    stylesTable.thead
                                                )}
                                                style={{
                                                    gridTemplateColumns: '1fr',
                                                }}
                                            >
                                                <div className={stylesTable.th}>
                                                    Проработка толщины крема
                                                </div>
                                            </div>
                                            <div className={stylesTable.tbody}>
                                                {settings && (
                                                    <BodyTable
                                                        key={Math.random()}
                                                        settings={settings}
                                                        setSettings={
                                                            setSettings
                                                        }
                                                        index="1"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button
                                        className={classNames(
                                            'btn',
                                            'small-text'
                                        )}
                                        href="#"
                                        onClick={() => resetSettings()}
                                    >
                                        Сбросить настройки
                                    </button>
                                    <button
                                        className={classNames(
                                            'btn',
                                            'btn__secondary',
                                            'small-text'
                                        )}
                                        href="#"
                                        onClick={() => saveSettings()}
                                    >
                                        Сохранить
                                    </button>
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
            <Alert />
        </div>
    );
}
