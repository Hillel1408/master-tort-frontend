import classNames from 'classnames';
import styles from './Header.module.scss';

function Header({ title }) {
    return (
        <header className={styles.root}>
            <h1 className={classNames('title', styles.title)}>{title}</h1>
            <div className={styles.login}>
                <a className={classNames('text', styles.loginLink)} href="#">
                    Вход
                </a>
                <span className={styles.text}>|</span>
                <a className={classNames('text', styles.loginLink)} href="#">
                    Регистрация
                </a>
            </div>
        </header>
    );
}

export { Header };
