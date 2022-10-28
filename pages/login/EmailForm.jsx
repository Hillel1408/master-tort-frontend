import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';

function EmailForm({ setIsLogin }) {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        console.log(values);
    };

    return (
        <div className={styles.root}>
            <h2 className={classNames('title', styles.title)}>
                Восстановление пароля
            </h2>
            <p className={classNames('small-text', styles.text)}>
                Введите электронную почту, указанную
                <br /> при регистрации
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={classNames('input', styles.input)}
                    type="email"
                    placeholder="Электронная почта"
                    {...register('email', {
                        required: true,
                    })}
                />
                <button
                    className={classNames(
                        'small-text',
                        'btn',
                        styles.btn,
                        'btn__secondary'
                    )}
                    type="submit"
                    disabled={!isValid}
                >
                    Отправить
                </button>
            </form>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(true);
                }}
                href=""
                className={classNames('small-text', styles.link)}
                style={{ marginBottom: '0' }}
            >
                Назад
            </a>
        </div>
    );
}

export { EmailForm };
