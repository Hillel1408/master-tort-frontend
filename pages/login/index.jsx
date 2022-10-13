import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from './Login.module.scss';

export default function Login() {
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
                                    <a href="#">Зарегистрироваться</a>
                                </span>
                            </p>
                            <input
                                className={classNames('input', styles.input)}
                                type="email"
                                name="email"
                                placeholder="Электронная почта"
                            />
                            <input
                                className={classNames('input', styles.input)}
                                type="password"
                                name="password"
                                placeholder="Пароль"
                            />
                            <button
                                className={classNames(
                                    'small-text',
                                    'btn',
                                    styles.btn,
                                    'btn__secondary'
                                )}
                                href="#"
                            >
                                Войти
                            </button>
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
