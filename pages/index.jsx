import classNames from 'classnames';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import styles from './Home.module.scss';
import stylesTable from '../components/Table/Table.module.scss';
import stylesTooltip from '../components/Tooltip/Tooltip.module.scss';
import { wrapper } from '../redux/store';
import axios from 'axios';
import { API_URL } from '../http';
import $api from '../http';
import { useEffect, useState } from 'react';

export default function Home() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('token', response.data.accessToken);
                setIsAuth(true);
                console.log(response);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
    }, []);
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header
                    title="Расчет торта"
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                />
                <main className="main">
                    <div className={styles.mainBlock}>
                        <div className={styles.tabs}>
                            <div className={styles.tab}>
                                <div
                                    className={classNames(
                                        'text',
                                        styles.tabItem
                                    )}
                                >
                                    Вариант 1
                                </div>
                                <div
                                    className={classNames(
                                        'text',
                                        styles.tabItem,
                                        styles.tabActive
                                    )}
                                >
                                    Вариант 2
                                </div>
                                <span className="icon-8"></span>
                            </div>
                            <section className={styles.tabContent}>
                                <div className={styles.tabContentGridContainer}>
                                    <div
                                        className={styles.information}
                                        style={{ maxHeigh: '280px' }}
                                    >
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.informationText
                                            )}
                                        >
                                            Основная информация
                                        </h3>
                                        <input
                                            type="text"
                                            name="name-project"
                                            className={classNames(
                                                'input',
                                                styles.informationInput
                                            )}
                                            placeholder="Название проекта"
                                        />
                                        <div
                                            className={
                                                styles.informationInputBlock
                                            }
                                        >
                                            <input
                                                type="date"
                                                name="date-project"
                                                className={classNames(
                                                    'input',
                                                    styles.informationInput
                                                )}
                                            />
                                            <input
                                                type="time"
                                                name="time-project"
                                                className={classNames(
                                                    'input',
                                                    styles.informationInput
                                                )}
                                            />
                                        </div>
                                        <textarea
                                            className={classNames(
                                                'input',
                                                styles.informationTextarea
                                            )}
                                            placeholder="Комментарий к заказу"
                                        ></textarea>
                                    </div>
                                    <div className={styles.information}>
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.informationText
                                            )}
                                        >
                                            Вес 1 порции
                                        </h3>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value="50"
                                            className={classNames(
                                                styles.informationSlider,
                                                styles.slider
                                            )}
                                            id="myRange"
                                        />
                                    </div>
                                    <div
                                        className={classNames(
                                            styles.informationInputBlock,
                                            styles.informationInputBlockGap
                                        )}
                                    >
                                        <div className={styles.information}>
                                            <h3
                                                className={classNames(
                                                    'text',
                                                    styles.informationText
                                                )}
                                            >
                                                Подставка
                                            </h3>
                                            <div
                                                className={
                                                    styles.informationInputBlock
                                                }
                                            >
                                                <input
                                                    type="number"
                                                    name="stand-width"
                                                    className="input"
                                                    placeholder="Ширина"
                                                />
                                                <input
                                                    type="number"
                                                    name="stand-length"
                                                    className="input"
                                                    placeholder="Длина"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.information}>
                                            <h3
                                                className={classNames(
                                                    'text',
                                                    styles.informationText
                                                )}
                                            >
                                                Стоимость, ₽
                                            </h3>
                                            <input
                                                type="number"
                                                name="price"
                                                className="input"
                                                placeholder="Стоимость торта"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.information}>
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.informationText
                                            )}
                                        >
                                            Форма торта
                                        </h3>
                                        <div
                                            className={
                                                styles.informationLabelBlock
                                            }
                                        >
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.informationLabel
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="cake-shape"
                                                    value="circle"
                                                    checked
                                                />
                                                <span className="icon-13">
                                                    Круг
                                                </span>
                                            </label>
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.informationLabel
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="cake-shape"
                                                    value="square"
                                                />
                                                <span className="icon-14">
                                                    Квадрат
                                                </span>
                                            </label>
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.informationLabel
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="cake-shape"
                                                    value="rectangle"
                                                />
                                                <span className="icon-15">
                                                    Прямоугольник
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.information}>
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.informationText
                                            )}
                                        >
                                            Вид торта
                                        </h3>
                                        <div
                                            className={
                                                styles.informationLabelBlock
                                            }
                                        >
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.informationLabel
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="kind-cake"
                                                    value="open-cake"
                                                    checked
                                                />
                                                <span className="icon-12">
                                                    Открытый торт
                                                </span>
                                            </label>
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.informationLabel
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="kind-cake"
                                                    value="buttercream-cake"
                                                />
                                                <span className="icon-13">
                                                    Мастичный торт
                                                </span>
                                            </label>
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.informationLabel
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="kind-cake"
                                                    value="cream-cake"
                                                />
                                                <span className="icon-13">
                                                    Кремовый торт
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.information}>
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.informationText
                                            )}
                                        >
                                            Фотографии
                                        </h3>
                                        <div
                                            className={
                                                styles.informationImageBlock
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.informationImage
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.informationImageImg
                                                    }
                                                >
                                                    <img src="1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.informationImage
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.informationImageImg
                                                    }
                                                >
                                                    <img src="1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.informationImage
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.informationImageImg
                                                    }
                                                >
                                                    <img src="1.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="addBlock">
                                            <span
                                                className={classNames(
                                                    'small-text',
                                                    'icon-8'
                                                )}
                                            >
                                                Добавить фото
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.information}>
                                    <h3
                                        className={classNames(
                                            'text',
                                            styles.informationText
                                        )}
                                    >
                                        Ярусы
                                    </h3>
                                    <div className={stylesTable.overflow}>
                                        <div
                                            className={classNames(
                                                'small-text',
                                                stylesTable.table
                                            )}
                                            style={{ minWidth: '590px' }}
                                        >
                                            <div
                                                className={classNames(
                                                    'text',
                                                    stylesTable.thead
                                                )}
                                                style={{
                                                    gridTemplateColumns:
                                                        '20% 20% 20% 36% 4%',
                                                }}
                                            >
                                                <div className={stylesTable.th}>
                                                    Диаметр, см.
                                                </div>
                                                <div className={stylesTable.th}>
                                                    Высота, см.
                                                </div>
                                                <div className={stylesTable.th}>
                                                    Отступ, см.
                                                </div>
                                                <div className={stylesTable.th}>
                                                    Рецепт
                                                </div>
                                                <div
                                                    className={classNames(
                                                        stylesTable.th,
                                                        stylesTable.thDelete
                                                    )}
                                                ></div>
                                            </div>
                                            <div className={stylesTable.tbody}>
                                                <div
                                                    className={stylesTable.tr}
                                                    style={{
                                                        gridTemplateColumns:
                                                            '20% 20% 20% 36% 4%',
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            stylesTable.td
                                                        }
                                                    >
                                                        <input
                                                            type="number"
                                                            name=""
                                                            className="input"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            stylesTable.td
                                                        }
                                                    >
                                                        <input
                                                            type="number"
                                                            name=""
                                                            className="input"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            stylesTable.td
                                                        }
                                                    >
                                                        <input
                                                            type="number"
                                                            name=""
                                                            className="input"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            stylesTable.td
                                                        }
                                                    >
                                                        <select
                                                            className={classNames(
                                                                'input',
                                                                'select'
                                                            )}
                                                        >
                                                            <option></option>
                                                            <option>
                                                                Шоколадная
                                                            </option>
                                                            <option>
                                                                Медовик
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div
                                                        className={classNames(
                                                            stylesTable.td,
                                                            stylesTable.tdDelete
                                                        )}
                                                    >
                                                        <span
                                                            className={classNames(
                                                                'icon-11',
                                                                stylesTable.delete
                                                            )}
                                                        ></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="addBlock">
                                        <span
                                            className={classNames(
                                                'small-text',
                                                'icon-8'
                                            )}
                                        >
                                            Добавить ярус
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.tabContentButtons}>
                                    <button
                                        className={classNames(
                                            'btn',
                                            'small-text'
                                        )}
                                        href="#"
                                    >
                                        Печать
                                    </button>
                                    <button
                                        className={classNames(
                                            'btn',
                                            'btn__secondary',
                                            'small-text'
                                        )}
                                        href="order"
                                    >
                                        Добавить в заказы
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div className={styles.cake}>
                            <div className={stylesTooltip.tooltip}>
                                <h2
                                    className={classNames(
                                        'title',
                                        styles.cakeTitle
                                    )}
                                >
                                    Визуализация силуэта
                                </h2>
                                <div className={stylesTooltip.tooltiptext}>
                                    <div>
                                        <span>Порций в ярусе</span>
                                        <span>Вес начинки</span>
                                        <span>Вес выравнивающего крема</span>
                                        <span>Вес мастики</span>
                                        <span>Общий вес яруса</span>
                                    </div>
                                    <div>
                                        <span>4</span>
                                        <span>400 г</span>
                                        <span>60 г</span>
                                        <span>40 г</span>
                                        <span>600 г</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cakeImage}>
                                <img src="2.jpg" alt="" />
                            </div>
                            <div className={classNames('total', 'small-text')}>
                                <h2
                                    className={classNames(
                                        'title',
                                        styles.cakeColumnTitle
                                    )}
                                >
                                    Итого
                                </h2>
                                <div className={styles.cakeColumns}>
                                    <div className={styles.cakeColumn}>
                                        <div>Порций в торте</div>
                                        <div>16</div>
                                    </div>
                                    <div className={styles.cakeColumn}>
                                        <div>
                                            Общий вес выравнивающего крема
                                        </div>
                                        <div>400 г</div>
                                    </div>
                                    <div className={styles.cakeColumn}>
                                        <div>Порций в торте</div>
                                        <div>16</div>
                                    </div>
                                    <div className={styles.cakeColumn}>
                                        <div>Общий вес мастики</div>
                                        <div>420 г</div>
                                    </div>
                                    <div className={styles.cakeColumn}>
                                        <div>Общий вес торта</div>
                                        <div>3800 г</div>
                                    </div>
                                    <div className={styles.cakeColumn}>
                                        <div>Себестоимость торта</div>
                                        <div>5000 ₽</div>
                                    </div>
                                </div>
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
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {}
);
