import classNames from 'classnames';

import styles from '../login/Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

function Form({ onSubmit, register, error, isValid, handleSubmit, isLoading }) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                className={classNames(stylesInput.input, styles.input)}
                placeholder="Имя"
                {...register('fullName', {
                    required: true,
                })}
            />
            <input
                placeholder="Город"
                className={classNames(stylesInput.input, styles.input)}
                {...register('city', {
                    required: true,
                })}
            />
            <input
                placeholder="Электронная почта"
                type="email"
                className={classNames(stylesInput.input, styles.input)}
                {...register('email', {
                    required: true,
                })}
            />
            <input
                placeholder="Пароль"
                type="password"
                className={classNames(stylesInput.input, styles.input)}
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
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
        </form>
    );
}

export { Form };
