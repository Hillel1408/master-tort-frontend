import classNames from 'classnames';
import styles from './Sidebar.module.scss';

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <a href="/" className={classNames('text', styles.logo__link)}>
                    <img src="logo.svg" alt="" />
                    Помощник кондитеру
                </a>
            </div>
            <div className={styles.sidebar__nav}>
                <div className={styles.sidebar__navIcon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={styles.sidebar__navList}>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-1"></i>Заказы
                        </a>
                    </li>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-2"></i>Расчет торта
                        </a>
                    </li>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-3"></i>Продукты
                        </a>
                    </li>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-4"></i>Закупка
                        </a>
                    </li>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-5"></i>Мои рецепты
                        </a>
                    </li>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-6"></i>Блог
                        </a>
                    </li>
                    <li className={styles.header__navItem}>
                        <a
                            className={classNames(
                                'text',
                                styles.sidebar__navLink
                            )}
                            href="#"
                        >
                            <i className="icon-7"></i>Настройки
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export { Sidebar };
