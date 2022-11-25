import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Header.module.scss';
import AuthService from '../../services/AuthService';

function Header({ isAuth, setIsAuth, userName, avatar }) {
    const [tooltipActive, setTooltipActive] = useState(false);

    const logout = async () => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            setIsAuth(false);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    return (
        <>
            {isAuth ? (
                <div className={styles.menu}>
                    <Link href="/personal-settings">
                        <div className={styles.avatar}>
                            {avatar ? (
                                <img src={avatar} alt="avatar" />
                            ) : (
                                <span className="icon-21"></span>
                            )}
                        </div>
                    </Link>
                    <div
                        className={styles.block}
                        onClick={() => setTooltipActive(!tooltipActive)}
                    >
                        <span className={classNames('text', styles.userName)}>
                            {userName}
                        </span>
                        <span
                            className={classNames(
                                'icon-30',
                                styles.icon,
                                tooltipActive && styles.iconActive
                            )}
                        ></span>
                    </div>
                    <div
                        className={classNames(
                            styles.tooltip,
                            tooltipActive && styles.tooltipActive
                        )}
                    >
                        <Link href="/personal-settings">
                            <a
                                className={classNames(
                                    styles.link,
                                    'small-text'
                                )}
                            >
                                Личный кабинет
                            </a>
                        </Link>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                            href=""
                            className={classNames(styles.link, 'small-text')}
                        >
                            Выход
                        </a>
                    </div>
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
        </>
    );
}

export { Header };
