import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import { BodyTable } from '../../components/pages/settings/BodyTable';
import { Alert } from '../../components/Alert';
import { Modal } from '../../components/Modal';
import { setAlert } from '../../redux/cakeSlice';
import AuthService from '../../services/AuthService';
import SettingsService from '../../services/SettingsService';
import { settingsText } from '../../data/settings';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Settings.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Settings() {
    const [isAuth, setIsAuth] = useState('');
    const [settings, setSettings] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [modalActive, setModalActive] = useState(false);

    const dispatch = useDispatch();

    const saveSettings = async () => {
        let flag = false;
        //провверяем все ли настройки ввел пользователь
        Object.keys(settings).map((key) => {
            if (key === 'weightOfCoveredCake') {
                if (settings[key][0] === '') flag = true;
            } else if (settings[key][0] === '' || settings[key][1] === '')
                flag = true;
        });
        if (flag) {
            setModalActive(true);
        } else {
            //сохраняем настройки пользователя
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
                dispatch(
                    setAlert({ text: 'Возникла ошибка', color: '#c34a43' })
                );
            }
        }
    };

    const resetSettings = () => {
        //обнуляем настройки
        const newObj = {};
        Object.keys(settings).map((key) => {
            newObj[key] = ['', ''];
        });
        setSettings({ ...newObj });
    };

    useEffect(() => {
        const getSettings = async (user) => {
            //получаем настройки пользователя
            try {
                const response = await SettingsService.get(user);
                response.data && setSettings(response.data);
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
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
            <Head>
                <title>Настройки</title>
            </Head>
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
                    onClick={() => saveSettings()}
                >
                    Сохранить
                </button>
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                closeIcon={true}
            >
                <span className="icon-16"></span>
                <p className={classNames('text', styles.modalText)}>
                    Для точности расчетов необходимо заполнить все настройки
                </p>
            </Modal>
            <Alert />
        </Layout>
    );
}
