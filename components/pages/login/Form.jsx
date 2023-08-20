import classNames from 'classnames';

import styles from '../../../pages/login/Login.module.scss';
import stylesInput from '../../Input/Input.module.scss';
import stylesBtn from '../../Btn/Btn.module.scss';

function Form({ onSubmit, register, error, isValid, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                className={classNames(stylesInput.input, styles.input)}
                type="email"
                placeholder="Электронная почта"
                {...register('email', {
                    required: true,
                })}
            />
            <input
                className={classNames(stylesInput.input, styles.input)}
                type="password"
                placeholder="Пароль"
                {...register('password', {
                    required: true,
                })}
            />
            <p className={classNames(styles.error, 'small-text')}>{error}</p>
            <button
                className={classNames(
                    'small-text',
                    stylesBtn.btn,
                    styles.btn,
                    stylesBtn.btn__secondary
                )}
                type="submit"
                disabled={!isValid}
            >
                Войти
            </button>
        </form>
    );
}

export { Form };
