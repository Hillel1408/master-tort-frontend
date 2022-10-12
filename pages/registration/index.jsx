import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import styles from '../login/Login.module.scss';

export default function Registration() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Регистрация" />
                <main className="main">
                    <div className={styles.registration__wrapper}>
                        <div className={styles.registration}>
                            <h2
                                className={classNames(
                                    'title',
                                    styles.registration__title
                                )}
                            >
                                Регистрация
                            </h2>
                            <p
                                className={classNames(
                                    'small-text',
                                    styles.registration__text
                                )}
                            >
                                Уже есть учетная запись?
                                <span>
                                    <a href="#">Войти</a>
                                </span>
                            </p>
                            <input
                                className={classNames(
                                    'input',
                                    styles.registration__input
                                )}
                                type="text"
                                name="name"
                                placeholder="Имя пользователя"
                            />
                            <input
                                className={classNames(
                                    'input',
                                    styles.registration__input
                                )}
                                type="text"
                                name="city"
                                placeholder="Город"
                            />
                            <input
                                className={classNames(
                                    'input',
                                    styles.registration__input
                                )}
                                type="email"
                                name="email"
                                placeholder="Электронная почта"
                            />
                            <input
                                className={classNames(
                                    'input',
                                    styles.registration__input
                                )}
                                type="password"
                                name="password"
                                placeholder="Пароль"
                            />
                            <button
                                className={classNames(
                                    'small-text',
                                    'btn',
                                    styles.registration__btn,
                                    'btn__secondary'
                                )}
                                href="#"
                            >
                                Зарегистрироваться
                            </button>
                            <div className={styles.registration__or}>
                                <span>или</span>
                            </div>
                            <p
                                className={classNames(
                                    'small-text',
                                    styles.registration__textBottom
                                )}
                            >
                                Регистрация с помощью:
                            </p>
                            <div className={styles.registration__socialLinks}>
                                <a href="#" class="icon-23"></a>
                                <a href="#" class="icon-24"></a>
                                <a href="#" class="icon-25"></a>
                                <a href="#" class="icon-26"></a>
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
