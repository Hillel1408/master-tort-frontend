import classNames from 'classnames';
import { destroyCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { setDataUser_2 } from '../../redux/cakeSlice';

import AuthService from '../../services/AuthService';

import styles from './NoAccess.module.scss';
import stylesLogin from '../../pages/login/Login.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

function NoAccess({ title, text, linkBtn, textBtn, isLogin, setIsAuth }) {
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

    const styleBtn = [
        stylesBtn.btn,
        'small-text',
        stylesBtn.btn__secondary,
        styles.btn,
    ];

    return (
        <div className={stylesLogin.wrapper}>
            <h2 className={classNames('title', styles.title)}>{title}</h2>
            {text && (
                <p className={classNames('small-text', styles.text)}>{text}</p>
            )}
            {isLogin ? (
                <button
                    className={classNames(...styleBtn)}
                    onClick={() => logout()}
                >
                    {textBtn}
                </button>
            ) : (
                <Link href={linkBtn}>
                    <button className={classNames(...styleBtn)}>
                        {textBtn}
                    </button>
                </Link>
            )}
        </div>
    );
}

export { NoAccess };
