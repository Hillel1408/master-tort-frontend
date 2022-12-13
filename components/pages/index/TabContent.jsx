import React from 'react';
import { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Tr } from './Tr';
import { Tooltip } from '../../Tooltip';
import { Alert } from '../../Alert';
import { Total } from './Total';
import UploadService from '../../../services/UploadService';
import OrdersService from '../../../services/OrdersService';
import { setAlert } from '../../../redux/cakeSlice';
import styles from '../../../pages/Home.module.scss';
import stylesTable from '../../Table/Table.module.scss';
import stylesTooltip from '../../Tooltip/Tooltip.module.scss';
import stylesInput from '../../Input/Input.module.scss';
import stylesBtn from '../../Btn/Btn.module.scss';
import { CSSTransition } from 'react-transition-group';

function TabContent({
    items,
    index,
    style,
    userId,
    isEdit,
    setItems,
    select,
    value,
    products,
}) {
    const [drag, setDrag] = useState(false);
    const [isCake, setIsCake] = useState(false);

    const [range, setRange] = useState(items[index].range);
    const [orderName, setOrderName] = useState(items[index].orderName);
    const [date, setDate] = useState(items[index].date);
    const [time, setTime] = useState(items[index].time);
    const [image, setImage] = useState(items[index].imagesUrl);
    const [standWidth, setStandWidth] = useState(items[index].standWidth);
    const [standLength, setStandLength] = useState(items[index].standLength);
    const [cakeShape, setCakeShape] = useState(items[index].cakeShape);
    const [kindCake, setKindCake] = useState(items[index].kindCake);
    const [info, setInfo] = useState(items[index].info);
    const [price, setPrice] = useState(items[index].price);

    const [data, setData] = useState(items[index].calculation);
    const [show, setShow] = useState(true);
    const [total, setTotal] = useState(items[index].total);

    const dispatch = useDispatch();

    const inputFileRef = useRef('');
    const btnRef = useRef('');
    const buttonRef = useRef('');

    const thTitle = ['Диаметр, см.', 'Высота, см.', 'Отступ, см.', 'Рецепт'];

    const trValue = {
        diameter: '',
        height: '',
        indent: '',
        recipe: { value: '', label: '' },
    };

    //проверяем заполнил ли пользователь данные для добавления заказа
    useEffect(() => {
        if (btnRef.current) {
            orderName && date && time && image.length !== 0
                ? (btnRef.current.disabled = false)
                : (btnRef.current.disabled = true);
        }
    }, [orderName, date, time, image]);

    //проверяем заполнил ли пользователь данные для расчета заказа
    useEffect(() => {
        if (buttonRef.current) {
            range && standWidth && standLength && cakeShape && kindCake
                ? (buttonRef.current.disabled = false)
                : (buttonRef.current.disabled = true);
        }
    }, [range, standWidth, standLength, cakeShape, kindCake]);

    const sendImage = async (file) => {
        //отправляем картинку торта на сервер
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await UploadService.set(formData);
            items[index].imagesUrl = [
                ...items[index].imagesUrl,
                response.data.url,
            ];
            setImage([...image, response.data.url]);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const resetSettings = () => {
        items[index] = value;
        setItems([...items]);
        //обнуляем стейты
        setOrderName('');
        setDate('');
        setTime('');
        setInfo('');
        setRange('');
        setStandWidth('');
        setStandLength('');
        setPrice('');
        setCakeShape('');
        setKindCake('');
        setImage([]);
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

    const calculationOrder = async () => {
        try {
            const response = await OrdersService.calculationOrder({
                ...items[index],
                user: userId,
            });
            setData(response.data);
            const newProducts = {};
            response.data.map((item) => {
                if (item.products) {
                    item.products.map((product) => {
                        product.products.map((item) => {
                            newProducts[item.product.value]
                                ? (newProducts[item.product.value] =
                                      newProducts[item.product.value] +
                                      item.net)
                                : (newProducts[item.product.value] = item.net);
                        });
                    });
                }
            });
            let arr = [];
            let total = 0;
            for (let key in newProducts) {
                console.log(key);
                const a = products.find((product) => product.id === key);
                let b = '';
                if (a.unit.value === 'kg' || a.unit.value === 'liter') {
                    b = (a.price / (a.package * 1000)) * newProducts[key];
                }
                if (a.unit.value === 'count' || a.unit.value === 'gr') {
                    b = (a.price / a.package) * newProducts[key];
                }
                arr.push({
                    id: key,
                    name: a.name,
                    count: newProducts[key],
                    price: b,
                    checked: false,
                });
                total = total + Number(b);
            }
            arr.push(total);
            setTotal(arr);
            setShow(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const addOrder = async () => {
        try {
            const response = await OrdersService.setOrders(userId, {
                ...items[index],
                calculation: data,
                total,
            });
            dispatch(
                setAlert({
                    text: isEdit
                        ? 'Заказ успешно изменен'
                        : 'Заказ успешно сохранен',
                    color: '#62ac62',
                })
            );
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
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
                                value={orderName}
                                placeholder="Название проекта"
                                onChange={(e) => setOrderName(e.target.value)}
                                onBlur={(e) => {
                                    items[index].orderName = orderName;
                                }}
                            />
                            <div className={styles.informationInputBlock}>
                                <input
                                    type="date"
                                    className={classNames(
                                        stylesInput.input,
                                        styles.informationInput
                                    )}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    onBlur={(e) => {
                                        items[index].date = date;
                                    }}
                                />
                                <input
                                    type="time"
                                    className={classNames(
                                        stylesInput.input,
                                        styles.informationInput
                                    )}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    onBlur={(e) => {
                                        items[index].time = time;
                                    }}
                                />
                            </div>
                            <textarea
                                className={classNames(
                                    stylesInput.input,
                                    styles.informationTextarea
                                )}
                                placeholder="Комментарий к заказу"
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                                onBlur={(e) => {
                                    items[index].info = info;
                                }}
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
                                className={classNames(
                                    styles.informationSlider,
                                    styles.slider
                                )}
                                value={range}
                                onChange={(e) => {
                                    setRange(e.target.value);
                                    setShow(false);
                                    items[index].range = range;
                                }}
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
                                        value={standWidth}
                                        onChange={(e) =>
                                            setStandWidth(e.target.value)
                                        }
                                        onBlur={(e) => {
                                            items[index].standWidth =
                                                standWidth;
                                        }}
                                    />
                                    <input
                                        type="number"
                                        className={stylesInput.input}
                                        placeholder="Длина"
                                        value={standLength}
                                        onChange={(e) =>
                                            setStandLength(e.target.value)
                                        }
                                        onBlur={(e) => {
                                            items[index].standLength =
                                                standLength;
                                        }}
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
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    onBlur={(e) => {
                                        items[index].price = price;
                                    }}
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
                                    <input
                                        type="radio"
                                        name={'cakeShape' + index}
                                        value="circle"
                                        defaultChecked={cakeShape === 'circle'}
                                        onChange={(e) => {
                                            setCakeShape(e.target.value);
                                            items[index].cakeShape =
                                                e.target.value;
                                        }}
                                    />
                                    <span className="icon-13">Круг</span>
                                </label>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name={'cakeShape' + index}
                                        value="square"
                                        disabled
                                        defaultChecked={cakeShape === 'square'}
                                        onChange={(e) => {
                                            setCakeShape(e.target.value);
                                            items[index].cakeShape =
                                                e.target.value;
                                        }}
                                    />
                                    <span className="icon-14">Квадрат</span>
                                </label>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name={'cakeShape' + index}
                                        value="rectangle"
                                        disabled
                                        defaultChecked={
                                            cakeShape === 'rectangle'
                                        }
                                        onChange={(e) => {
                                            setCakeShape(e.target.value);
                                            items[index].cakeShape =
                                                e.target.value;
                                        }}
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
                            <div className={styles.informationLabelBlock}>
                                <label
                                    className={classNames(
                                        'small-text',
                                        styles.informationLabel
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name={'kindCake' + index}
                                        value="open-cake"
                                        defaultChecked={
                                            kindCake === 'open-cake'
                                        }
                                        onChange={(e) => {
                                            setKindCake(e.target.value);
                                            setShow(false);
                                            items[index].kindCake =
                                                e.target.value;
                                        }}
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
                                        name={'kindCake' + index}
                                        value="buttercream-cake"
                                        defaultChecked={
                                            kindCake === 'buttercream-cake'
                                        }
                                        onChange={(e) => {
                                            setKindCake(e.target.value);
                                            setShow(false);
                                            items[index].kindCake =
                                                e.target.value;
                                        }}
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
                                        name={'kindCake' + index}
                                        value="cream-cake"
                                        disabled
                                        defaultChecked={
                                            kindCake === 'cream-cake'
                                        }
                                        onChange={(e) => {
                                            setKindCake(e.target.value);
                                            items[index].kindCake =
                                                e.target.value;
                                        }}
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
                                        className={classNames(styles.icon12)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                        </svg>
                                    </span>
                                )}
                                {image.length > 0 &&
                                    image.map((item) => (
                                        <div
                                            key={item}
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
                        <div
                            className={classNames(
                                stylesTable.overflow,
                                'table'
                            )}
                            style={{ overflow: 'auto' }}
                        >
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
                                        {thTitle.map((item, index) => (
                                            <div
                                                key={index}
                                                className={stylesTable.th}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className={classNames(stylesTable.th)}
                                        style={{ width: '22px' }}
                                    ></div>
                                </div>
                                <div className={stylesTable.tbody}>
                                    {items[index].table.map(
                                        (item, tableIndex) => (
                                            <Tr
                                                key={item.id}
                                                select={select}
                                                index={index}
                                                item={item}
                                                items={items}
                                                setItems={setItems}
                                                tableIndex={tableIndex}
                                            />
                                        )
                                    )}
                                    <div className="addBlock">
                                        <span
                                            className={classNames(
                                                'small-text',
                                                'icon-8'
                                            )}
                                            onClick={() => {
                                                const id = uuid();
                                                items[index].table = [
                                                    ...items[index].table,
                                                    { ...trValue, id: id },
                                                ];
                                                setItems([...items]);
                                            }}
                                        >
                                            Добавить ярус
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tabContentButtons}>
                        <div>
                            <button
                                onClick={() => {
                                    window.print();
                                }}
                                className={classNames(
                                    stylesBtn.btn,
                                    'small-text'
                                )}
                                style={{ marginRight: '10px' }}
                            >
                                Печать
                            </button>
                            <button
                                className={classNames(
                                    stylesBtn.btn,
                                    'small-text'
                                )}
                                onClick={() => {
                                    resetSettings();
                                }}
                            >
                                Сбросить
                            </button>
                        </div>
                        <div>
                            <button
                                ref={buttonRef}
                                className={classNames(
                                    stylesBtn.btn,
                                    stylesBtn.btn__secondary,
                                    'small-text'
                                )}
                                style={{ marginRight: '10px' }}
                                onClick={() => {
                                    calculationOrder();
                                }}
                            >
                                Рассчитать
                            </button>
                            <button
                                ref={btnRef}
                                className={classNames(
                                    stylesBtn.btn,
                                    stylesBtn.btn__secondary,
                                    'small-text'
                                )}
                                onClick={() => {
                                    addOrder();
                                }}
                            >
                                {isEdit ? 'Изменить' : 'Добавить в заказы'}
                            </button>
                        </div>
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
                            <div>Порций в ярусе</div>
                            <div>Вес начинки</div>
                            <div>Вес выравнивающего крема</div>
                            <div>Вес мастики</div>
                            <div>Общий вес яруса</div>
                        </div>
                        <div>
                            <div>0</div>
                            <div>0</div>
                            <div>0</div>
                            <div>0</div>
                            <div>0</div>
                        </div>
                    </Tooltip>
                </div>
                {isCake ? (
                    <div className={styles.cakeImage}>
                        <img src="2.jpg" alt="" />
                    </div>
                ) : (
                    <div className={styles.cakeBlock}>
                        <div>
                            <span className="icon-2"></span>
                            <p className="title">
                                Скоро здесь появится силуэт вашего торта
                            </p>
                        </div>
                    </div>
                )}
                {data.length > 0 && (
                    <CSSTransition
                        in={show}
                        timeout={300}
                        classNames="my-node"
                        unmountOnExit
                    >
                        <Total data={data} total={total} />
                    </CSSTransition>
                )}
            </div>
            <Alert />
        </div>
    );
}

export { TabContent };
