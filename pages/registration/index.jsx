import Link from 'next/link';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from '../login/Login.module.scss';
import { useForm } from 'react-hook-form';

export default function Registration() {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            city: '',
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
                <Header title="Регистрация" />
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
