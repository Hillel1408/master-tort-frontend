import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Settings.module.scss';
import { useState, useEffect } from 'react';
import { NoAccess } from '../../components/NoAccess';
import axios from 'axios';
import { API_URL } from '../../http';

export default function Settings() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const checkAuth = async (values) => {
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                setIsAuth(true);
                console.log(response);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
    }, []);
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Настройки" isAuth={isAuth} />
                <main className="main">
                    {isAuth ? (
                        <>
                            <div className={styles.info}>
                                <h2
                                    className={classNames('text', styles.title)}
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
                                            web-enabled networks. Conveniently
                                            engineer leveraged internal or
                                            "organic" sources through
                                            frictionless benefits.
                                            Monotonectally synergize integrated
                                            core competencies and cross-unit
                                            "outside the box" thinking.
                                            Rapidiously empower professional
                                            interfaces through effective
                                            bandwidth. Uniquely leverage other's
                                            quality resources with customized
                                            technologies.
                                        </p>
                                        <p className={styles.text}>
                                            Enthusiastically empower dynamic
                                            internal or "organic" sources
                                            without high-quality platforms.
                                            Progressively whiteboard ubiquitous
                                            outsourcing vis-a-vis fully tested
                                            data.
                                        </p>
                                        <p className={styles.text}>
                                            Completely enable strategic
                                            collaboration and idea-sharing after
                                            effective collaboration and.
                                        </p>
                                    </div>
                                    <div className={styles.column}>
                                        <p className={styles.text}>
                                            Holisticly embrace resource-leveling
                                            platforms and e-business internal or
                                            "organic" sources. Professionally
                                            extend accurate process improvements
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
                                            Objectively transition team driven
                                            web services before multifunctional
                                            catalysts for change.
                                            Authoritatively mesh inexpensive
                                            manufactured products vis-a-vis
                                            future-proof methods of empowerment.
                                            Proactively customize prospective
                                            infomediaries via professional
                                            e-services. Authoritatively
                                            strategize.
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
                                            <div
                                                className={stylesTable.tr}
                                                style={{
                                                    gridTemplateColumns:
                                                        '2fr 1fr',
                                                }}
                                            >
                                                <div className={stylesTable.td}>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        class="input"
                                                    />
                                                </div>
                                                <div className={stylesTable.td}>
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
                                                <div className={stylesTable.td}>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        class="input"
                                                    />
                                                </div>
                                                <div className={stylesTable.td}>
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
                                    className={classNames('btn', 'small-text')}
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
                    )}
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
