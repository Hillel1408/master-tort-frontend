import classNames from 'classnames';
import Link from 'next/link';

import styles from './Header.module.scss';

function Entry() {
    return (
        <div className={styles.login}>
            <Link
                href="/login"
                className={classNames('text', styles.loginLink)}
            >
                Вход
            </Link>
            <span className={styles.text}>|</span>
            <Link
                href="registration"
                className={classNames('text', styles.loginLink)}
            >
                Регистрация
            </Link>
        </div>
    );
}

export { Entry };
