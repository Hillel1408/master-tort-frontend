import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import classNames from 'classnames';
import { Oval } from 'react-loader-spinner';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { SocialLinks } from '../../components/SocialLinks';
import AuthService from '../../services/AuthService';
import SettingsService from '../../services/SettingsService';
import { settingsMastic } from '../../data/settings';
import styles from '../login/Login.module.scss';
import stylesHeader from '../../components/Header/Header.module.scss';
import stylesLogin from '../login/Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Registration() {
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    const saveSettings = async (id) => {
        try {
            const response = await SettingsService.set({
                ...settingsMastic,
                userId: id,
            });
            router.push('/');
        } catch (e) {
            setIsLoading(false);
            console.log(e.response?.data?.message);
        }
    };

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            const response = await AuthService.registration(values);
            localStorage.setItem('token', response.data.accessToken);
            saveSettings(response.data.user.id);
        } catch (e) {
            console.log(e.response?.data?.message);
            setIsLoading(false);
            e.response?.data[0]
                ? setError(e.response?.data[0]?.msg)
                : setError(e.response?.data?.message);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                router.push('/');
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <header className={stylesHeader.root}>
                    <h1 className={classNames('title', stylesHeader.title)}>
                        Регистрация
                    </h1>
                    {isAuth !== '' ? (
                        <Header isAuth={isAuth} />
                    ) : (
                        <Oval
                            height={40}
                            width={40}
                            color="#009998"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#7a7a7a"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    )}
                </header>
                <main className="main">
                    {isAuth !== '' ? (
                        <div className={styles.wrapper}>
                            <div className={styles.root}>
                                <h2
                                    className={classNames(
                                        'title',
                                        styles.title
                                    )}
                                >
                                    Регистрация
                                </h2>
                                <p
                                    className={classNames(
                                        'small-text',
                                        styles.text
                                    )}
                                >
                                    Уже есть учетная запись?
                                    <span>
                                        <Link href="/login">
                                            <a>Войти</a>
                                        </Link>
                                    </span>
                                </p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        placeholder="Имя"
                                        className={classNames(
                                            stylesInput.input,
                                            styles.input
                                        )}
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
                                        {isLoading
                                            ? 'Регистрация...'
                                            : 'Зарегистрироваться'}
                                    </button>
                                </form>
                                <div className={styles.or}>
                                    <span>или</span>
                                </div>
                                <p
                                    className={classNames(
                                        'small-text',
                                        styles.textBottom
                                    )}
                                >
                                    Регистрация с помощью:
                                </p>
                                <SocialLinks />
                            </div>
                        </div>
                    ) : (
                        <div className={stylesLogin.wrapper}>
                            <Oval
                                height={40}
                                width={40}
                                color="#009998"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#7a7a7a"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    )}
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
