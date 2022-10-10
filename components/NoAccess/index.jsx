import classNames from 'classnames';
import styles from './NoAccess.module.scss';
import stylesLogin from '../../pages/login/Login.module.scss';

function NoAccess() {
    return (
        <div className={stylesLogin.registration__wrapper}>
            <h2 className={classNames('title', styles.noAccess__title)}>
                Доступ закрыт
            </h2>
            <p className={classNames('small-text', styles.noAccess__text)}>
                Зарегистрируйтесь или войдите в учетную запись, чтобы
                использовать все возможности сервиса
            </p>
            <button
                className={classNames(
                    'btn',
                    'small-text',
                    'btn__secondary',
                    styles.noAccess__btn
                )}
                href="#"
            >
                Войти
            </button>
        </div>
    );
}

export { NoAccess };
