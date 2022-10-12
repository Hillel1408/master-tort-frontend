import classNames from 'classnames';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import styles from './Home.module.scss';
import stylesTable from '../components/Table/Table.module.scss';
import stylesTooltip from '../components/Tooltip/Tooltip.module.scss';

export default function Home() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Расчет торта" />
                <main className="main">
                    <div className={styles.main__block}>
                        <div className={styles.tabs}>
                            <div className={styles.tab}>
                                <div
                                    className={classNames(
                                        'text',
                                        styles.tab__item
                                    )}
                                >
                                    Вариант 1
                                </div>
                                <div
                                    className={classNames(
                                        'text',
                                        styles.tab__item,
                                        styles.tabActive
                                    )}
                                >
                                    Вариант 2
                                </div>
                                <span className="icon-8"></span>
                            </div>
                            <section className={styles.tabContent}>
                                <div
                                    className={styles.tabContent__gridContainer}
                                >
                                    <div
                                        className={styles.information}
                                        style={{ maxHeigh: '280px' }}
                                    >
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.information__text
                                            )}
                                        >
                                            Основная информация
                                        </h3>
                                        <input
                                            type="text"
                                            name="name-project"
                                            className={classNames(
                                                'input',
                                                styles.information__input
                                            )}
                                            placeholder="Название проекта"
                                        />
                                        <div
                                            className={
                                                styles.information__inputBlock
                                            }
                                        >
                                            <input
                                                type="date"
                                                name="date-project"
                                                className={classNames(
                                                    'input',
                                                    styles.information__input
                                                )}
                                            />
                                            <input
                                                type="time"
                                                name="time-project"
                                                className={classNames(
                                                    'input',
                                                    styles.information__input
                                                )}
                                            />
                                        </div>
                                        <textarea
                                            className={classNames(
                                                'input',
                                                styles.information__textarea
                                            )}
                                            placeholder="Комментарий к заказу"
                                        ></textarea>
                                    </div>
                                    <div className={styles.information}>
                                        <h3
                                            className={classNames(
                                                'text',
                                                styles.information__text
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
                                                styles.information__slider,
                                                styles.slider
                                            )}
                                            id="myRange"
                                        />
                                    </div>
                                    <div
                                        className={classNames(
                                            styles.information__inputBlock,
                                            styles.information__inputBlock_gap
                                        )}
                                    >
                                        <div className={styles.information}>
                                            <h3
                                                className={classNames(
                                                    'text',
                                                    styles.information__text
                                                )}
                                            >
                                                Подставка
                                            </h3>
                                            <div
                                                className={
                                                    styles.information__inputBlock
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
                                                    styles.information__text
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
                                                styles.information__text
                                            )}
                                        >
                                            Форма торта
                                        </h3>
                                        <div
                                            className={
                                                styles.information__labelBlock
                                            }
                                        >
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.information__label
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
                                                    styles.information__label
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
                                                    styles.information__label
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
                                                styles.information__text
                                            )}
                                        >
                                            Вид торта
                                        </h3>
                                        <div
                                            className={
                                                styles.information__labelBlock
                                            }
                                        >
                                            <label
                                                className={classNames(
                                                    'small-text',
                                                    styles.information__label
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
                                                    styles.information__label
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
                                                    styles.information__label
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
                                                styles.information__text
                                            )}
                                        >
                                            Фотографии
                                        </h3>
                                        <div
                                            className={
                                                styles.information__imageBlock
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.information__image
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.information__imageImg
                                                    }
                                                >
                                                    <img src="1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.information__image
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.information__imageImg
                                                    }
                                                >
                                                    <img src="1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.information__image
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.information__imageImg
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
                                            styles.information__text
                                        )}
                                    >
                                        Ярусы
                                    </h3>
                                    <div
                                        className={stylesTable.table__overflow}
                                    >
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
                                                    stylesTable.tableThead
                                                )}
                                                style={{
                                                    gridTemplateColumns:
                                                        '20% 20% 20% 36% 4%',
                                                }}
                                            >
                                                <div
                                                    className={
                                                        stylesTable.tableTh
                                                    }
                                                >
                                                    Диаметр, см.
                                                </div>
                                                <div
                                                    className={
                                                        stylesTable.tableTh
                                                    }
                                                >
                                                    Высота, см.
                                                </div>
                                                <div
                                                    className={
                                                        stylesTable.tableTh
                                                    }
                                                >
                                                    Отступ, см.
                                                </div>
                                                <div
                                                    className={
                                                        stylesTable.tableTh
                                                    }
                                                >
                                                    Рецепт
                                                </div>
                                                <div
                                                    className={classNames(
                                                        stylesTable.tableTh,
                                                        stylesTable.tableTh__delete
                                                    )}
                                                ></div>
                                            </div>
                                            <div
                                                className={
                                                    stylesTable.tableTbody
                                                }
                                            >
                                                <div
                                                    className={
                                                        stylesTable.tableTr
                                                    }
                                                    style={{
                                                        gridTemplateColumns:
                                                            '20% 20% 20% 36% 4%',
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            stylesTable.tableTd
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
                                                            stylesTable.tableTd
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
                                                            stylesTable.tableTd
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
                                                            stylesTable.tableTd
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
                                                            stylesTable.tableTd,
                                                            stylesTable.tableTd__delete
                                                        )}
                                                    >
                                                        <span
                                                            className={classNames(
                                                                'icon-11',
                                                                stylesTable.tableDelete
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
                                <div className={styles.tabContent__buttons}>
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
                                        styles.cake__title
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
                            <div className={styles.cake__image}>
                                <img src="2.jpg" alt="" />
                            </div>
                            <div className={classNames('total', 'small-text')}>
                                <h2
                                    className={classNames(
                                        'title',
                                        styles.cake__columnTitle
                                    )}
                                >
                                    Итого
                                </h2>
                                <div className={styles.cake__columns}>
                                    <div className={styles.cake__column}>
                                        <div>Порций в торте</div>
                                        <div>16</div>
                                    </div>
                                    <div className={styles.cake__column}>
                                        <div>
                                            Общий вес выравнивающего крема
                                        </div>
                                        <div>400 г</div>
                                    </div>
                                    <div className={styles.cake__column}>
                                        <div>Порций в торте</div>
                                        <div>16</div>
                                    </div>
                                    <div className={styles.cake__column}>
                                        <div>Общий вес мастики</div>
                                        <div>420 г</div>
                                    </div>
                                    <div className={styles.cake__column}>
                                        <div>Общий вес торта</div>
                                        <div>3800 г</div>
                                    </div>
                                    <div className={styles.cake__column}>
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
