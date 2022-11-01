import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from './PersonalSettings.module.scss';
import stylesTooltip from '../../components/Tooltip/Tooltip.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';

export default function PersonalSettings() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Личный кабинет" />
                <main className="main">
                    <div className={styles.root}>
                        <div className={styles.info}>
                            <h2
                                className={classNames('text', styles.infoTitle)}
                            >
                                Основная информация
                            </h2>
                            <div className={styles.infoColumns}>
                                <div className={styles.infoAvatar}>
                                    <span className="icon-21"></span>
                                </div>
                                <div className={styles.infoInputs}>
                                    <input
                                        className={classNames(
                                            stylesInput.input,
                                            styles.infoInput
                                        )}
                                        type="text"
                                        name="user-name"
                                        placeholder="Имя пользователя"
                                    />
                                    <input
                                        className={classNames(
                                            stylesInput.input,
                                            styles.infoInput
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
                        <div className={styles.security}>
                            <h2
                                className={classNames('text', styles.infoTitle)}
                            >
                                Безопасность
                            </h2>
                            <input
                                className={classNames(
                                    stylesInput.input,
                                    styles.securityInput
                                )}
                                type="password"
                                name="user-old-password"
                                placeholder="Старый пароль"
                            />
                            <input
                                className={classNames(
                                    stylesInput.input,
                                    styles.securityInput
                                )}
                                type="password"
                                name="user-new-password"
                                placeholder="Новый пароль"
                            />
                            <input
                                className={classNames(
                                    stylesInput.input,
                                    styles.securityInput
                                )}
                                type="password"
                                name="user-repeat-new-password"
                                placeholder="Повторите пароль"
                            />
                            <div className={styles.securityButtons}>
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
                        <div className={styles.order}>
                            <h2
                                className={classNames('text', styles.infoTitle)}
                            >
                                Управление заказами
                            </h2>
                            <div className={styles.orderBlock}>
                                <select
                                    className={classNames(
                                        stylesInput.input,
                                        'select'
                                    )}
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
                                        stylesTooltip.tooltip,
                                        styles.orderTooltip
                                    )}
                                >
                                    <span className="icon-22"></span>
                                    <div className={stylesTooltip.tooltiptext}>
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
