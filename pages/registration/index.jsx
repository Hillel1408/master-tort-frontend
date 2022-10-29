import Link from 'next/link';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from '../login/Login.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '../../services/AuthService';
import SettingsService from '../../services/SettingsService';
import stylesHeader from '../../components/Header/Header.module.scss';
import { settingsMastic } from '../../data/settings';

export default function Registration() {
    const [error, setError] = useState();
    const [isAuth, setIsAuth] = useState();
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
            console.log(e.response?.data?.message);
        }
    };

    const onSubmit = async (values) => {
        try {
            const response = await AuthService.registration(values);
            localStorage.setItem('token', response.data.accessToken);
            saveSettings(response.data.user.id);
        } catch (e) {
            console.log(e.response?.data?.message);
            setError(e.response?.data?.message);
        }
    };

    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <header className={stylesHeader.root}>
                    <h1 className={classNames('title', stylesHeader.title)}>
                        Регистрация
                    </h1>
                    {isAuth !== undefined ? (
                        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
                    ) : (
                        'Загрузка...'
                    )}
                </header>
                <main className="main">
                    <div className={styles.wrapper}>
                        <div className={styles.root}>
                            <h2 className={classNames('title', styles.title)}>
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
                                        'input',
                                        styles.input
                                    )}
                                    {...register('fullName', {
                                        required: true,
                                    })}
                                />
                                <input
                                    placeholder="Город"
                                    className={classNames(
                                        'input',
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
                                        'input',
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
                                        'input',
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
                                        'btn',
                                        styles.btn,
                                        'btn__secondary'
                                    )}
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Зарегистрироваться
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
                            <div className={styles.socialLinks}>
                                <a href="#" className="icon-23"></a>
                                <a href="#" className="icon-24"></a>
                                <a href="#" className="icon-25"></a>
                                <a href="#" className="icon-26"></a>
                            </div>
                        </div>
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
