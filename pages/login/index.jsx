import Link from 'next/link';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EmailForm } from './EmailForm';
import AuthService from '../../services/AuthService';
import { useRouter } from 'next/router';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        try {
            const response = await AuthService.login(values);
            localStorage.setItem('token', response.data.accessToken);
            router.push('/');
        } catch (e) {
            console.log(e.response?.data?.message);
            setError(e.response?.data?.message);
        }
    };

    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Вход" />
                <main className="main">
                    <div className={styles.wrapper}>
                        {isLogin ? (
                            <div className={styles.root}>
                                <h2
                                    className={classNames(
                                        'title',
                                        styles.title
                                    )}
                                >
                                    Вход
                                </h2>
                                <p
                                    className={classNames(
                                        'small-text',
                                        styles.text
                                    )}
                                >
                                    Нет учетной записи?
                                    <span>
                                        <Link href="/registration">
                                            <a>Зарегистрироваться</a>
                                        </Link>
                                    </span>
                                </p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        className={classNames(
                                            'input',
                                            styles.input
                                        )}
                                        type="email"
                                        placeholder="Электронная почта"
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                    <input
                                        className={classNames(
                                            'input',
                                            styles.input
                                        )}
                                        type="password"
                                        placeholder="Пароль"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                    <p
                                        className={classNames(
                                            styles.error,
                                            'small-text'
                                        )}
                                    >
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
                                        Войти
                                    </button>
                                </form>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsLogin(false);
                                    }}
                                    className={classNames(
                                        'small-text',
                                        styles.link
                                    )}
                                >
                                    Забыли пароль?
                                </a>
                                <div className={styles.or}>
                                    <span>или</span>
                                </div>
                                <p
                                    className={classNames(
                                        'small-text',
                                        styles.textBottom
                                    )}
                                >
                                    Вход с помощью:
                                </p>
                                <div className={styles.socialLinks}>
                                    <a href="#" className="icon-23"></a>
                                    <a href="#" className="icon-24"></a>
                                    <a href="#" className="icon-25"></a>
                                    <a href="#" className="icon-26"></a>
                                </div>
                            </div>
                        ) : (
                            <EmailForm setIsLogin={setIsLogin} />
                        )}
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
