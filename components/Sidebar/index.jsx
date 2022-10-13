import classNames from 'classnames';
import styles from './Sidebar.module.scss';

function Sidebar() {
    return (
        <aside className={styles.root}>
            <div className={styles.logo}>
                <a href="/" className={classNames('text', styles.logoLink)}>
                    <img src="logo.svg" alt="" />
                    Помощник кондитеру
                </a>
            </div>
            <div className={styles.nav}>
                <div className={styles.navIcon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
                            href="#"
                        >
                            <i className="icon-1"></i>Заказы
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
                            href="#"
                        >
                            <i className="icon-2"></i>Расчет торта
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
                            href="#"
                        >
                            <i className="icon-3"></i>Продукты
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
                            href="#"
                        >
                            <i className="icon-4"></i>Закупка
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
                            href="#"
                        >
                            <i className="icon-5"></i>Мои рецепты
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
                            href="#"
                        >
                            <i className="icon-6"></i>Блог
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            className={classNames('text', styles.navLink)}
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
