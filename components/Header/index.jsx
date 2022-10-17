import Link from 'next/link';
import classNames from 'classnames';
import styles from './Header.module.scss';

function Header({ title, isAuth }) {
    return (
        <header className={styles.root}>
            <h1 className={classNames('title', styles.title)}>{title}</h1>
            {isAuth ? (
                <div className={styles.menu}>
                    <div className={styles.avatar}>
                        <span className="icon-21"></span>
                    </div>
                    <span className={classNames('text', styles.userName)}>
                        Имя пользователя
                    </span>
                    <span className="icon-30"></span>
                </div>
            ) : (
                <div className={styles.login}>
                    <Link href="/login">
                        <a className={classNames('text', styles.loginLink)}>
                            Вход
                        </a>
                    </Link>
                    <span className={styles.text}>|</span>
                    <Link href="registration">
                        <a className={classNames('text', styles.loginLink)}>
                            Регистрация
                        </a>
                    </Link>
                </div>
            )}
        </header>
    );
}

export { Header };
