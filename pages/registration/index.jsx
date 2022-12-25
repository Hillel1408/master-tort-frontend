import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import classNames from 'classnames';
import { SocialLinks } from '../../components/SocialLinks';
import AuthService from '../../services/AuthService';
import styles from '../login/Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import Layout from '../../components/Layout';

export default function Registration() {
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            fullName: '',
            city: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        //обработчик формы, отправляем регистрационные данные
        try {
            setIsLoading(true);
            const response = await AuthService.registration(values);
            localStorage.setItem('token', response.data.accessToken);
            router.push('/');
        } catch (e) {
            console.log(e.response?.data?.message);
            setIsLoading(false);
            e.response?.data[0]
                ? setError(e.response?.data[0]?.msg)
                : setError(e.response?.data?.message);
        }
    };

    useEffect(() => {
        //проверяем авторизован ли пользовтель
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
            title="Регистрация"
            isLogin={true}
        >
            <Head>
                <title>Регистрация</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.root}>
                    <h2 className={classNames('title', styles.title)}>
                        Регистрация
                    </h2>
                    <p className={classNames('small-text', styles.text)}>
                        Уже есть учетная запись?
                        <span>
                            <Link href="/login">Войти</Link>
                        </span>
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className={classNames(
                                stylesInput.input,
                                styles.input
                            )}
                            placeholder="Имя"
                            {...register('fullName', {
                                required: true,
                            })}
                        />
                        <input
                            placeholder="Город"
                            className={classNames(
                                stylesInput.input,
                                styles.input
                            )}
                            {...register('city', {
                                required: true,
                            })}
                        />
                        <input
                            placeholder="Электронная почта"
                            type="email"
                            className={classNames(
                                stylesInput.input,
                                styles.input
                            )}
                            {...register('email', {
                                required: true,
                            })}
                        />
                        <input
                            placeholder="Пароль"
                            type="password"
                            className={classNames(
                                stylesInput.input,
                                styles.input
                            )}
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <p className={classNames(styles.error, 'small-text')}>
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
                            {isLoading
                                ? 'Регистрация...'
                                : 'Зарегистрироваться'}
                        </button>
                    </form>
                    <div className={styles.or}>
                        <span>или</span>
                    </div>
                    <p className={classNames('small-text', styles.textBottom)}>
                        Регистрация с помощью:
                    </p>
                    <SocialLinks />
                </div>
            </div>
        </Layout>
    );
}
