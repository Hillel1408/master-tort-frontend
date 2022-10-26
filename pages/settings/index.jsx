import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import SettingsService from '../../services/SettingsService';
import stylesHeader from '../../components/Header/Header.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Settings.module.scss';
import { NoAccess } from '../../components/NoAccess';
import stylesLogin from '../login/Login.module.scss';
import { TableTd } from '../../components/TableTd';

export default function Settings() {
    const [isAuth, setIsAuth] = useState();
    const [settings, setSettings] = useState();
    const [dataUser, setDataUser] = useState();

    const saveSettings = async () => {
        try {
            const response = await SettingsService.set({
                ...settings,
                userId: dataUser.id,
            });
            console.log(response);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
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
                setIsAuth(true);
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
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <header className={stylesHeader.root}>
                    <h1 className={classNames('title', stylesHeader.title)}>
                        Настройки
                    </h1>
                    {isAuth !== undefined ? (
                        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
                    ) : (
                        'Загрузка...'
                    )}
                </header>
                <main className="main">
                    {isAuth !== undefined ? (
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
                                            <p className={styles.text}>
                                                Energistically recaptiualize
                                                pandemic innovation through
                                                web-enabled networks.
                                                Conveniently engineer leveraged
                                                internal or "organic" sources
                                                through frictionless benefits.
                                                Monotonectally synergize
                                                integrated core competencies and
                                                cross-unit "outside the box"
                                                thinking. Rapidiously empower
                                                professional interfaces through
                                                effective bandwidth. Uniquely
                                                leverage other's quality
                                                resources with customized
                                                technologies.
                                            </p>
                                            <p className={styles.text}>
                                                Enthusiastically empower dynamic
                                                internal or "organic" sources
                                                without high-quality platforms.
                                                Progressively whiteboard
                                                ubiquitous outsourcing vis-a-vis
                                                fully tested data.
                                            </p>
                                            <p className={styles.text}>
                                                Completely enable strategic
                                                collaboration and idea-sharing
                                                after effective collaboration
                                                and.
                                            </p>
                                        </div>
                                        <div className={styles.column}>
                                            <p className={styles.text}>
                                                Holisticly embrace
                                                resource-leveling platforms and
                                                e-business internal or "organic"
                                                sources. Professionally extend
                                                accurate process improvements
                                                via progressive technologies.
                                                Efficiently promote
                                                clicks-and-mortar intellectual
                                                capital without installed base
                                                results. Distinctively fabricate
                                                premier mindshare and cross
                                                functional core competencies.
                                                Completely facilitate compelling
                                                users vis-a-vis plug-and-play
                                                e-business.
                                            </p>
                                            <p className={styles.text}>
                                                Objectively transition team
                                                driven web services before
                                                multifunctional catalysts for
                                                change. Authoritatively mesh
                                                inexpensive manufactured
                                                products vis-a-vis future-proof
                                                methods of empowerment.
                                                Proactively customize
                                                prospective infomediaries via
                                                professional e-services.
                                                Authoritatively strategize.
                                            </p>
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
                                                {settings &&
                                                    Object.keys(settings).map(
                                                        (key) => (
                                                            <div
                                                                className={
                                                                    stylesTable.tr
                                                                }
                                                                style={{
                                                                    gridTemplateColumns:
                                                                        '2fr 1fr',
                                                                }}
                                                            >
                                                                <TableTd
                                                                    value={key}
                                                                    disabled={
                                                                        true
                                                                    }
                                                                    thValue={
                                                                        key
                                                                    }
                                                                />
                                                                <TableTd
                                                                    value={
                                                                        settings[
                                                                            key
                                                                        ]
                                                                    }
                                                                    thValue={
                                                                        key
                                                                    }
                                                                    disabled={
                                                                        false
                                                                    }
                                                                    setSettings={
                                                                        setSettings
                                                                    }
                                                                    settings={
                                                                        settings
                                                                    }
                                                                    type="number"
                                                                />
                                                            </div>
                                                        )
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
                                                <div
                                                    className={stylesTable.tr}
                                                    style={{
                                                        gridTemplateColumns:
                                                            '2fr 1fr',
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            stylesTable.td
                                                        }
                                                    >
                                                        <input
                                                            type="text"
                                                            name=""
                                                            class="input"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            stylesTable.td
                                                        }
                                                    >
                                                        <input
                                                            type="number"
                                                            name=""
                                                            class="input"
                                                        />
                                                    </div>
                                                </div>
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
                        <div className={stylesLogin.wrapper}>Загрузка...</div>
                    )}
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
