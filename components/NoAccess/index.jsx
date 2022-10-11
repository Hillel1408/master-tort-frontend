import classNames from 'classnames';
import styles from './NoAccess.module.scss';
import stylesLogin from '../../pages/login/Login.module.scss';

function NoAccess({ title, text, linkBtn, textBtn }) {
    return (
        <div className={stylesLogin.registration__wrapper}>
            <h2 className={classNames('title', styles.noAccess__title)}>
                {title}
            </h2>
            <p className={classNames('small-text', styles.noAccess__text)}>
                {text}
            </p>
            <button
                className={classNames(
                    'btn',
                    'small-text',
                    'btn__secondary',
                    styles.noAccess__btn
                )}
                href={linkBtn}
            >
                {textBtn}
            </button>
        </div>
    );
}

export { NoAccess };
