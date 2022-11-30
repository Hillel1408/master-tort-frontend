import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip';
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
                        <Tooltip
                            visiblePopup={tooltipActive}
                            style={styles.tooltip}
                            setVisiblePopup={setTooltipActive}
                            close={true}
                        >
                            <Link
                                href="/personal-settings"
                                className={classNames(
                                    styles.link,
                                    'small-text'
                                )}
                            >
                                Личный кабинет
                            </Link>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                                href=""
                                className={classNames(
                                    styles.link,
                                    'small-text'
                                )}
                            >
                                Выход
                            </a>
                        </Tooltip>
                    </div>
                </div>
            ) : (
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
            )}
        </>
    );
}

export { Header };
