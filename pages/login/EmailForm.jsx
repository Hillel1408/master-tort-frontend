import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import Link from 'next/link';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

function EmailForm({ setIsLogin }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const btnRef = React.useRef(null);

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
            btnRef.current.disabled = true;
            setIsLoading(true);
            const response = await AuthService.reset(values);
            setSuccess(true);
        } catch (e) {
            btnRef.current.disabled = false;
            setIsLoading(false);
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
                            className={classNames(
                                stylesInput.input,
                                styles.input
                            )}
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
                            ref={btnRef}
                            className={classNames(
                                'small-text',
                                stylesBtn.btn,
                                styles.btn,
                                stylesBtn.btn__secondary
                            )}
                            type="submit"
                            disabled={!isValid}
                        >
                            {isLoading ? 'Отправка...' : 'Отправить'}
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
