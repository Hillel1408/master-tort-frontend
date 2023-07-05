import { useState } from 'react';
import { destroyCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { Tooltip } from '../Tooltip';

import { setDataUser_2 } from '../../redux/cakeSlice';

import styles from './Header.module.scss';
import AuthService from '../../services/AuthService';

function Header({ isAuth, setIsAuth, userName, avatar }) {
    const [tooltipActive, setTooltipActive] = useState('');

    const dispatch = useDispatch();

    const logout = async () => {
        try {
            const response = await AuthService.logout();
            destroyCookie(null, 'token');
            dispatch(setDataUser_2(''));
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
                                <Image src={avatar} alt="avatar" fill />
                            ) : (
                                <span className="icon-21"></span>
                            )}
                        </div>
                    </Link>
                    <div
                        className={styles.block}
                        onClick={(e) => setTooltipActive(e)}
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
                    {tooltipActive && (
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
                    )}
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
