import classNames from 'classnames';
import Link from 'next/link';
import styles from './NoAccess.module.scss';
import stylesLogin from '../../pages/login/Login.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

function NoAccess({ title, text, linkBtn, textBtn }) {
    return (
        <div className={stylesLogin.wrapper}>
            <h2 className={classNames('title', styles.title)}>{title}</h2>
            <p className={classNames('small-text', styles.text)}>{text}</p>
            <Link href={linkBtn}>
                <button
                    className={classNames(
                        stylesBtn.btn,
                        'small-text',
                        stylesBtn.btn__secondary,
                        styles.btn
                    )}
                >
                    {textBtn}
                </button>
            </Link>
        </div>
    );
}

export { NoAccess };
