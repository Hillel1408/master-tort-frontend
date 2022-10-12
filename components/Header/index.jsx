import classNames from 'classnames';
import styles from './Header.module.scss';

function Header({ title }) {
    return (
        <header className={styles.header}>
            <h1 className={classNames('title', styles.header__title)}>
                {title}
            </h1>
            <div className={styles.header__login}>
                <a
                    className={classNames('text', styles.header__loginLink)}
                    href="#"
                >
                    Вход
                </a>
                <span className={styles.text}>|</span>
                <a
                    className={classNames('text', styles.header__loginLink)}
                    href="#"
                >
                    Регистрация
                </a>
            </div>
        </header>
    );
}

export { Header };
