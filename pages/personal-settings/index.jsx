import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from './PersonalSettings.module.scss';

export default function PersonalSettings() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title={'Личный кабинет'} />
                <main className="main">
                    <div className={styles.personalSettings}>
                        <div className={styles.mainInfo}>
                            <h2
                                className={classNames(
                                    'text',
                                    styles.mainInfo__title
                                )}
                            >
                                Основная информация
                            </h2>
                            <div className={styles.mainInfo__columns}>
                                <div className={styles.mainInfo__avatar}>
                                    <span className="icon-21"></span>
                                </div>
                                <div className={styles.mainInfo__inputs}>
                                    <input
                                        className={classNames(
                                            'input',
                                            styles.mainInfo__input
                                        )}
                                        type="text"
                                        name="user-name"
                                        placeholder="Имя пользователя"
                                    />
                                    <input
                                        className={classNames(
                                            'input',
                                            styles.mainInfo__input
                                        )}
                                        type="text"
                                        name="user-email"
                                        placeholder="Электронная почта"
                                    />
                                </div>
                            </div>
                            <div className="addBlock">
                                <span
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
                                >
                                    Загузить фото
                                </span>
                            </div>
                        </div>
                        <div className={styles.mainSecurity}>
                            <h2
                                className={classNames(
                                    'text',
                                    styles.mainInfo__title
                                )}
                            >
                                Безопасность
                            </h2>
                            <input
                                className={classNames(
                                    'input',
                                    styles.mainSecurity__input
                                )}
                                type="password"
                                name="user-old-password"
                                placeholder="Старый пароль"
                            />
                            <input
                                className={classNames(
                                    'input',
                                    styles.mainSecurity__input
                                )}
                                type="password"
                                name="user-new-password"
                                placeholder="Новый пароль"
                            />
                            <input
                                className={classNames(
                                    'input',
                                    styles.mainSecurity__input
                                )}
                                type="password"
                                name="user-repeat-new-password"
                                placeholder="Повторите пароль"
                            />
                            <div className={styles.mainSecurity__buttons}>
                                <button
                                    className={classNames('btn', 'small-text')}
                                    href="#"
                                >
                                    Сбросить
                                </button>
                                <button
                                    className={classNames(
                                        'btn',
                                        'small-text',
                                        'btn__secondary'
                                    )}
                                    href="#"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                        <div className={styles.mainOrder}>
                            <h2
                                className={classNames(
                                    'text',
                                    styles.mainInfo__title
                                )}
                            >
                                Управление заказами
                            </h2>
                            <div className={styles.mainOrder__block}>
                                <select
                                    className={classNames('input', 'select')}
                                >
                                    <option disabled selected hidden>
                                        Срочный заказ
                                    </option>
                                    <option>1 день</option>
                                    <option>2 дня</option>
                                    <option>3 дня</option>
                                </select>
                                <div
                                    className={classNames(
                                        'tooltip',
                                        styles.mainOrder__tooltip
                                    )}
                                >
                                    <span className="icon-22"></span>
                                    <div className="tooltiptext">
                                        <span className="small-text">
                                            Помечать заказ как “Срочный” (
                                            <i className="icon-27"></i>) за 2
                                            дня до даты заказа
                                        </span>
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
