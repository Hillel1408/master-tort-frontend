import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Settings.module.scss';

export default function Registration() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title={'Настройки'} />
                <main className="main">
                    <div className={styles.settings__info}>
                        <h2
                            className={classNames(
                                'text',
                                styles.settings__title
                            )}
                        >
                            Информация о настройках
                        </h2>
                        <div
                            className={classNames(
                                'small-text',
                                styles.settings__columns
                            )}
                        >
                            <div className={styles.settings__column}>
                                <p className={styles.settings__text}>
                                    Energistically recaptiualize pandemic
                                    innovation through web-enabled networks.
                                    Conveniently engineer leveraged internal or
                                    "organic" sources through frictionless
                                    benefits. Monotonectally synergize
                                    integrated core competencies and cross-unit
                                    "outside the box" thinking. Rapidiously
                                    empower professional interfaces through
                                    effective bandwidth. Uniquely leverage
                                    other's quality resources with customized
                                    technologies.
                                </p>
                                <p className={styles.settings__text}>
                                    Enthusiastically empower dynamic internal or
                                    "organic" sources without high-quality
                                    platforms. Progressively whiteboard
                                    ubiquitous outsourcing vis-a-vis fully
                                    tested data.
                                </p>
                                <p className={styles.settings__text}>
                                    Completely enable strategic collaboration
                                    and idea-sharing after effective
                                    collaboration and.
                                </p>
                            </div>
                            <div className={styles.settings__column}>
                                <p className={styles.settings__text}>
                                    Holisticly embrace resource-leveling
                                    platforms and e-business internal or
                                    "organic" sources. Professionally extend
                                    accurate process improvements via
                                    progressive technologies. Efficiently
                                    promote clicks-and-mortar intellectual
                                    capital without installed base results.
                                    Distinctively fabricate premier mindshare
                                    and cross functional core competencies.
                                    Completely facilitate compelling users
                                    vis-a-vis plug-and-play e-business.
                                </p>
                                <p className={styles.settings__text}>
                                    Objectively transition team driven web
                                    services before multifunctional catalysts
                                    for change. Authoritatively mesh inexpensive
                                    manufactured products vis-a-vis future-proof
                                    methods of empowerment. Proactively
                                    customize prospective infomediaries via
                                    professional e-services. Authoritatively
                                    strategize.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.settings__tables}>
                        <div className={stylesTable.table__overflow}>
                            <div className={classNames('table', 'small-text')}>
                                <div
                                    className={classNames(
                                        'text',
                                        stylesTable.tableThead
                                    )}
                                    style={{
                                        gridTemplateColumns: '1fr',
                                    }}
                                >
                                    <div className={stylesTable.tableTh}>
                                        Проработка толщины мастики
                                    </div>
                                </div>
                                <div className={stylesTable.tableTbody}>
                                    <div
                                        className={stylesTable.tableTr}
                                        style={{
                                            gridTemplateColumns: '2fr 1fr',
                                        }}
                                    >
                                        <div className={stylesTable.tableTd}>
                                            <input
                                                type="text"
                                                name=""
                                                class="input"
                                            />
                                        </div>
                                        <div className={stylesTable.tableTd}>
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
                        <div className={stylesTable.table__overflow}>
                            <div className={classNames('table', 'small-text')}>
                                <div
                                    className={classNames(
                                        'text',
                                        stylesTable.tableThead
                                    )}
                                    style={{
                                        gridTemplateColumns: '1fr',
                                    }}
                                >
                                    <div className={stylesTable.tableTh}>
                                        Проработка толщины крема
                                    </div>
                                </div>
                                <div className={stylesTable.tableTbody}>
                                    <div
                                        className={stylesTable.tableTr}
                                        style={{
                                            gridTemplateColumns: '2fr 1fr',
                                        }}
                                    >
                                        <div className={stylesTable.tableTd}>
                                            <input
                                                type="text"
                                                name=""
                                                class="input"
                                            />
                                        </div>
                                        <div className={stylesTable.tableTd}>
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
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
