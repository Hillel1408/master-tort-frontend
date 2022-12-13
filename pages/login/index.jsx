import { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SocialLinks } from '../../components/SocialLinks';
import { EmailForm } from '../../components/pages/login/EmailForm';
import AuthService from '../../services/AuthService';
import styles from './Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import Layout from '../../components/Layout';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');

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

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Вход"
            isLogin={true}
        >
            {isLogin ? (
                <div className={styles.wrapper}>
                    <div className={styles.root}>
                        <h2 className={classNames('title', styles.title)}>
                            Вход
                        </h2>
                        <p className={classNames('small-text', styles.text)}>
                            Нет учетной записи?
                            <span>
                                <Link href="/registration">
                                    Зарегистрироваться
                                </Link>
                            </span>
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
                            <input
                                className={classNames(
                                    stylesInput.input,
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
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsLogin(false);
                            }}
                            className={classNames('small-text', styles.link)}
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
                        <SocialLinks />
                    </div>
                </div>
            ) : (
                <EmailForm setIsLogin={setIsLogin} />
            )}
        </Layout>
    );
}
