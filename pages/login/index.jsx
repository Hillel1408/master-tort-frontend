import { useState, useEffect } from 'react';
import Link from 'next/link';
import { setCookie } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { setDataUser_2 } from '../../redux/cakeSlice';
import Layout from '../../components/Layout';
import { SocialLinks } from '../../components/SocialLinks';
import { EmailForm } from '../../components/pages/login/EmailForm';
import AuthService from '../../services/AuthService';
import styles from './Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');

    const router = useRouter();

    const dispatch = useDispatch();
    const { dataUser_2 } = useSelector((state) => state.cakes);

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
        //выполняем вход
        try {
            const response = await AuthService.login(values);
            setCookie(null, 'token', response.data.accessToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            dispatch(setDataUser_2(response.data.user));
            router.push('/');
        } catch (e) {
            console.log(e.response?.data?.message);
            setError(e.response?.data?.message);
        }
    };

    useEffect(() => {
        const checkAuth = () => {
            setDataUser(dataUser_2);
            setIsAuth(true);
        };
        if (dataUser_2) checkAuth();
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
            <Head>
                <title>Вход</title>
            </Head>
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
                        {/*<div className={styles.or}>
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
                            <SocialLinks />*/}
                    </div>
                </div>
            ) : (
                <EmailForm setIsLogin={setIsLogin} />
            )}
        </Layout>
    );
}
