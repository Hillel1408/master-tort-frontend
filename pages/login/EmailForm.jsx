import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function EmailForm({ setIsLogin }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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
        try {
            const response = await AuthService.reset(values);
            setSuccess(true);
        } catch (e) {
            console.log(e.response?.data?.message);
            setError(e.response?.data?.message);
        }
    };

    return (
        <div className={styles.root}>
            {success === true ? (
                <>
                    <p className={classNames('small-text', styles.text)}>
                        <h2 className={classNames('title', styles.title)}>
                            Новый пароль был создан
                        </h2>
                        Проверьте почтовый ящик, чтобы узнать как его
                        активизировать
                    </p>
                    <Link href="/">
                        <a
                            className={classNames('small-text', styles.link)}
                            style={{ marginBottom: '0' }}
                        >
                            На главную
                        </a>
                    </Link>
                </>
            ) : (
                <>
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
                        <p className={classNames(styles.error, 'small-text')}>
                            {error}
                        </p>
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
                </>
            )}
        </div>
    );
}

export { EmailForm };
