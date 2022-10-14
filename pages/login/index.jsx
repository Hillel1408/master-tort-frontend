import Link from 'next/link';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';

export default function Login() {
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
        console.log(values);
    };
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Вход" />
                <main className="main">
                    <div className={styles.wrapper}>
                        <div className={styles.root}>
                            <h2 className={classNames('title', styles.title)}>
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
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}