import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { BodyTable } from '../../components/pages/settings/BodyTable';
import { Alert } from '../../components/Alert';
import { setAlert } from '../../redux/cakeSlice';
import AuthService from '../../services/AuthService';
import SettingsService from '../../services/SettingsService';
import { settingsText } from '../../data/settings';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Settings.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import Layout from '../../components/Layout';

export default function Settings() {
    const [isAuth, setIsAuth] = useState('');
    const [settings, setSettings] = useState('');
    const [dataUser, setDataUser] = useState('');

    const dispatch = useDispatch();

    const saveSettings = async () => {
        try {
            const response = await SettingsService.set({
                ...settings,
                user: dataUser.id,
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
        const getSettings = async (user) => {
            try {
                const response = await SettingsService.get(user);
                setSettings(response.data);
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
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
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Настройки"
        >
            <div className={styles.info}>
                <h2 className={classNames('text', styles.title)}>
                    Информация о настройках
                </h2>
                <div className={classNames('small-text', styles.columns)}>
                    <div className={styles.column}>
                        {settingsText[0].map((item, index) => (
                            <p key={index} className={styles.text}>
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className={styles.column}>
                        {settingsText[1].map((item, index) => (
                            <p key={index} className={styles.text}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.tables}>
                <div className={stylesTable.overflow}>
                    <div className={classNames('table', 'small-text')}>
                        <div className={stylesTable.wrapperHead}>
                            <div
                                className={classNames(
                                    'text',
                                    stylesTable.thead
                                )}
                            >
                                <div className={stylesTable.th}>
                                    Проработка толщины мастики
                                </div>
                            </div>
                        </div>
                        <div className={stylesTable.tbody}>
                            {settings && (
                                <BodyTable
                                    key={0}
                                    settings={settings}
                                    setSettings={setSettings}
                                    index="0"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={stylesTable.overflow}>
                    <div className={classNames('table', 'small-text')}>
                        <div className={stylesTable.wrapperHead}>
                            <div
                                className={classNames(
                                    'text',
                                    stylesTable.thead
                                )}
                            >
                                <div className={stylesTable.th}>
                                    Проработка толщины крема
                                </div>
                            </div>
                        </div>
                        <div className={stylesTable.tbody}>
                            {settings && (
                                <BodyTable
                                    key={1}
                                    settings={settings}
                                    setSettings={setSettings}
                                    index="1"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={stylesTable.buttons}>
                <button
                    className={classNames(stylesBtn.btn, 'small-text')}
                    href="#"
                    onClick={() => resetSettings()}
                >
                    Сбросить
                </button>
                <button
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    href="#"
                    onClick={() => saveSettings()}
                >
                    Сохранить
                </button>
            </div>
            <Alert />
        </Layout>
    );
}
