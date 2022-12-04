import { useState, useRef } from 'react';
import classNames from 'classnames';
import { Tooltip } from '../../Tooltip';
import UploadService from '../../../services/UploadService';
import stylesTable from '../../Table/Table.module.scss';
import stylesTooltip from '../../Tooltip/Tooltip.module.scss';
import stylesInput from '../../Input/Input.module.scss';
import stylesBtn from '../../Btn/Btn.module.scss';
import styles from '../../../pages/Home.module.scss';

function TabContent({ items, index, style, setItems }) {
    const [range, setRange] = useState('');
    const [drag, setDrag] = useState(false);
    const inputFileRef = useRef('');

    const sendImage = async (file) => {
        //отправляем картинку торта на сервер
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await UploadService.set(formData);
            items[index].image = [...items[index].image, response.data.url];
            setItems([...items]);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const onDropHandler = async (e) => {
        //получаем картинку торта
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        sendImage(file);
        setDrag(false);
    };

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    const handleChangeFile = async (e) => {
        //получаем картинки торта
        const file = e.target.files[0];
        sendImage(file);
    };

    return (
        <div className={styles.mainBlock} style={style}>
            <div className={styles.tabs}>
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
                                className={classNames(
                                    stylesInput.input,
                                    styles.informationInput
                                )}
                                placeholder="Название проекта"
                            />
                            <div className={styles.informationInputBlock}>
                                <input
                                    type="date"
                                    className={classNames(
                                        stylesInput.input,
                                        styles.informationInput
                                    )}
                                />
                                <input
                                    type="time"
                                    className={classNames(
                                        stylesInput.input,
                                        styles.informationInput
                                    )}
                                />
                            </div>
                            <textarea
                                className={classNames(
                                    stylesInput.input,
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
                                Вес 1 порции: {range && `${range} гр.`}
                            </h3>
                            <input
                                type="range"
                                min="0"
                                max="250"
                                step="10"
                                className={classNames(
                                    styles.informationSlider,
                                    styles.slider
                                )}
                                onChange={(e) => setRange(e.target.value)}
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
                                <div className={styles.informationInputBlock}>
                                    <input
                                        type="number"
                                        className={stylesInput.input}
                                        placeholder="Ширина"
                                    />
                                    <input
                                        type="number"
                                        className={stylesInput.input}
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
                                    className={stylesInput.input}
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
                            <div className={styles.informationLabelBlock}>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input type="radio" value="circle" />
                                    <span className="icon-13">Круг</span>
                                </label>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input type="radio" value="square" />
                                    <span className="icon-14">Квадрат</span>
                                </label>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input type="radio" value="rectangle" />
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
                            <div className={styles.informationLabelBlock}>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input type="radio" value="open-cake" />
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
                                    <input type="radio" value="cream-cake" />
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
                            <div className={styles.informationImageBlock}>
                                {drag ? (
                                    <span
                                        onDragStart={(e) => dragStartHandler(e)}
                                        onDragLeave={(e) => dragLeaveHandler(e)}
                                        onDragOver={(e) => dragStartHandler(e)}
                                        onDrop={(e) => onDropHandler(e)}
                                        style={{
                                            fontSize: '12px',
                                            color: '#7a7a7a',
                                            borderColor: '#7a7a7a',
                                        }}
                                        className={classNames(styles.icon12)}
                                    >
                                        Отпустите
                                    </span>
                                ) : (
                                    <span
                                        onDragStart={(e) => dragStartHandler(e)}
                                        onDragLeave={(e) => dragLeaveHandler(e)}
                                        onDragOver={(e) => dragStartHandler(e)}
                                        className={classNames(
                                            'icon-12',
                                            styles.icon12
                                        )}
                                    ></span>
                                )}
                                {items[index].image.length > 0 &&
                                    items[index].image.map((item) => (
                                        <div
                                            className={styles.informationImage}
                                        >
                                            <div
                                                className={
                                                    styles.informationImageImg
                                                }
                                            >
                                                <img
                                                    src={`http://localhost:5000${item}`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="addBlock">
                                <span
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
                                    onClick={() => inputFileRef.current.click()}
                                >
                                    Добавить фото
                                </span>
                                <input
                                    ref={inputFileRef}
                                    type="file"
                                    onChange={(e) => {
                                        handleChangeFile(e);
                                    }}
                                    hidden
                                />
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
                                <div className={stylesTable.wrapperHead}>
                                    <div
                                        className={classNames(
                                            'text',
                                            stylesTable.thead
                                        )}
                                        style={{
                                            gridTemplateColumns:
                                                '25% 25% 25% 25%',
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
                                    </div>
                                    <div
                                        className={classNames(stylesTable.th)}
                                        style={{ width: '22px' }}
                                    ></div>
                                </div>
                                <div className={stylesTable.tbody}>
                                    <div className={stylesTable.wrapper}>
                                        <div
                                            className={stylesTable.tr}
                                            style={{
                                                gridTemplateColumns:
                                                    '25% 25% 25% 25%',
                                            }}
                                        >
                                            <div className={stylesTable.td}>
                                                <input
                                                    type="number"
                                                    name=""
                                                    className={
                                                        stylesInput.input
                                                    }
                                                />
                                            </div>
                                            <div className={stylesTable.td}>
                                                <input
                                                    type="number"
                                                    name=""
                                                    className={
                                                        stylesInput.input
                                                    }
                                                />
                                            </div>
                                            <div className={stylesTable.td}>
                                                <input
                                                    type="number"
                                                    name=""
                                                    className={
                                                        stylesInput.input
                                                    }
                                                />
                                            </div>
                                            <div className={stylesTable.td}>
                                                <select
                                                    className={classNames(
                                                        stylesInput.input,
                                                        'select'
                                                    )}
                                                >
                                                    <option></option>
                                                    <option>Шоколадная</option>
                                                    <option>Медовик</option>
                                                </select>
                                            </div>
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
                                className={classNames('small-text', 'icon-8')}
                            >
                                Добавить ярус
                            </span>
                        </div>
                    </div>
                    <div className={styles.tabContentButtons}>
                        <button
                            className={classNames(stylesBtn.btn, 'small-text')}
                            href="#"
                        >
                            Печать
                        </button>
                        <button
                            className={classNames(
                                stylesBtn.btn,
                                stylesBtn.btn__secondary,
                                'small-text'
                            )}
                            type="submit"
                        >
                            Добавить в заказы
                        </button>
                    </div>
                </section>
            </div>
            <div className={styles.cake}>
                <div className={stylesTooltip.tooltip}>
                    <h2 className={classNames('title', styles.cakeTitle)}>
                        Визуализация силуэта
                    </h2>
                    <Tooltip style={styles.tooltiptext}>
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
                    </Tooltip>
                </div>
                <div className={styles.cakeImage}>
                    <img src="2.jpg" alt="" />
                </div>
                <div className={classNames('total', 'small-text')}>
                    <h2 className={classNames('title', styles.cakeColumnTitle)}>
                        Итого
                    </h2>
                    <div className={styles.cakeColumns}>
                        <div className={styles.cakeColumn}>
                            <div>Порций в торте</div>
                            <div>16</div>
                        </div>
                        <div className={styles.cakeColumn}>
                            <div>Общий вес выравнивающего крема</div>
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
    );
}

export { TabContent };
