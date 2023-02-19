import React from 'react';
import { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);
import { OverlayScrollbars } from 'overlayscrollbars';
import Image from 'next/image';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Tr } from './Tr';
import { Alert } from '../../Alert';
import { Total } from './Total';
import { Modal } from '../../Modal';
import { Canvas } from './Canvas';
import { IMAGE_URL } from '../../../http';
import UploadService from '../../../services/UploadService';
import OrdersService from '../../../services/OrdersService';
import { setAlert } from '../../../redux/cakeSlice';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../../pages/Home.module.scss';
import stylesTable from '../../Table/Table.module.scss';
import stylesTooltip from '../../Tooltip/Tooltip.module.scss';
import stylesInput from '../../Input/Input.module.scss';
import stylesBtn from '../../Btn/Btn.module.scss';

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
    recipe,
}) {
    const [drag, setDrag] = useState(false);
    const [isCake, setIsCake] = useState(undefined);
    const [text, setText] = useState('');

    const [range, setRange] = useState(items[index].range);
    const [orderName, setOrderName] = useState(items[index].orderName);
    const [date, setDate] = useState(
        items[index].date ? new Date(items[index].date) : ''
    );
    const [time, setTime] = useState(
        items[index].time ? new Date(items[index].time) : ''
    );
    const [image, setImage] = useState(items[index].imagesUrl);
    const [standWidth, setStandWidth] = useState(items[index].standWidth);
    const [standLength, setStandLength] = useState(items[index].standLength);
    const [cakeShape, setCakeShape] = useState(items[index].cakeShape);
    const [kindCake, setKindCake] = useState(items[index].kindCake);
    const [info, setInfo] = useState(items[index].info);
    const [price, setPrice] = useState(items[index].price);
    const [modalActive, setModalActive] = useState(false);

    const [data, setData] = useState(items[index].calculation);
    const [total, setTotal] = useState(items[index].total);

    const dispatch = useDispatch();

    const inputFileRef = useRef('');
    const btnRef = useRef('');
    const buttonRef = useRef('');
    const canvasRef = useRef('');

    const config = {
        scrollbars: {
            autoHide: 'leave',
        },
    };

    const cakeShapeRef = useRef('');
    cakeShapeRef.current && OverlayScrollbars(cakeShapeRef.current, config);

    const kindCakeRef = useRef('');
    kindCakeRef.current && OverlayScrollbars(kindCakeRef.current, config);

    const imageRef = useRef('');
    imageRef.current && OverlayScrollbars(imageRef.current, config);

    const totalRef = useRef('');
    totalRef.current && OverlayScrollbars(totalRef.current, config);

    const thTitle = ['Диаметр, см.', 'Высота, см.', 'Рецепт', 'Отступ, см.'];

    const trValue = {
        diameter: '',
        height: '',
        recipe: { value: '', label: '' },
        indent: '',
    };

    useEffect(() => {
        if (data.length > 0) {
            setIsCake(true);
        } else setIsCake(false);
    }, []);

    useEffect(() => {
        //проверяем заполнил ли пользователь данные, необходимые для добавления заказа
        if (btnRef.current) {
            orderName && date && time && image.length !== 0
                ? (btnRef.current.disabled = false)
                : (btnRef.current.disabled = true);
        }
    }, [orderName, date, time, image]);

    useEffect(() => {
        //проверяем заполнил ли пользователь данные, необходимые для расчета заказа
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
            //и в стейты
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
        //обнуляем стейты для сброса настроек
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
        setData('');
        setTotal('');
        setIsCake(false);
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
        //получаем картинку торта
        const file = e.target.files[0];
        sendImage(file);
    };

    const calcOrder = (newPr) => {
        //считаем стоимость каждого продукта и общую сумму
        let arr = [];
        let total = 0;
        Object.keys(newPr).map((key) => {
            let b = '';
            //ищем продукт в базе продуктов пользователя
            const a = products.find((product) => product.id === key);
            const c = a.unit.value;
            //делаем расчеты в зависимости от единицы измерения продукта
            if (c === 'kg' || c === 'liter')
                b = (a.price / (a.package * 1000)) * newPr[key];
            else if (c === 'count' || c === 'gr')
                b = (a.price / a.package) * newPr[key];
            arr.push({
                id: key,
                name: a.name,
                count: newPr[key],
                price: b,
                checked: false,
            });
            //общая стоимость всех продуктов
            total = total + Number(b);
        });
        arr.push(total);
        setTotal(arr);
        items[index].total = arr;
    };

    const calcPr = (data) => {
        const newPr = {};
        //считаем сколько и каких нужно продуктов на заказ
        data.map((item) => {
            if (item.products) {
                item.products.map((pr) => {
                    pr.products.map((item) => {
                        //проверяем есть ли в нашем объекте продукт
                        if (newPr[item.product.value])
                            //если да, то считаем общее количество
                            newPr[item.product.value] =
                                newPr[item.product.value] + item.net;
                        //если нет, то создаем его
                        else newPr[item.product.value] = item.net;
                    });
                });
            }
        });
        calcOrder(newPr);
    };

    const canvas = () => {
        const colors = [
            '#00F5F4',
            '#00DFDE',
            '#00CBCA',
            '#00B9B8',
            '#00A8A7',
            '#009998',
            '#008A89',
            '#007C7B',
            '#00706F',
            '#006564',
            '#005B5A',
        ];
        const canvas = document.querySelector('.main'); //блок где отображаем график
        const height = '434'; //высота canvas
        const length = items[index].table.length; //количество ярусов торта
        let scale = 10; //масштаб 1 см scale пикселей
        let sum = 0; // высота торта
        let margin = 0; //отступ от границ по вертикали canvas
        let maxWidth = 0; //самый широкий ярус торта
        const ctx = canvasRef.current.getContext('2d');
        let width = '';

        if (window.innerWidth <= 1280) {
            width = (canvas.offsetWidth / 100) * 35 - 55;
        }
        if (window.innerWidth <= 768) {
            width = canvas.offsetWidth - 80;
        }
        if (window.innerWidth > 1280) {
            width = (canvas.offsetWidth / 100) * 35 - 95;
        }

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        for (let i = 0; i < length; i++) {
            //считаем сумму высот всех ярусов
            sum = sum + Number(items[index].table[i].height);
            if (Number(items[index].table[i].diameter) > maxWidth) {
                //и максимальную ширину яруса
                maxWidth = Number(items[index].table[i].diameter);
            }
        }
        if (Number(items[index].standWidth) > maxWidth)
            maxWidth = items[index].standWidth;
        //если торт помещается в canvas блок, то делаем масштаб по умолчанию
        if (
            sum * scale + margin * 2 < height &&
            maxWidth * scale + 30 * 2 < width
        ) {
            scale = 8;
        }
        //уменьшаем масштаб, если торт не влизает по высоте в canvas
        if (sum * scale + margin * 2 > height) {
            while (sum * scale + margin * 2 > height) {
                scale = scale - 0.01;
            }
        }
        //уменьшаем масштаб, если торт не влизает по ширине в canvas
        if (maxWidth * scale + 30 * 2 > width) {
            while (maxWidth * scale + 30 * 2 > width) {
                scale = scale - 0.01;
            }
        }
        //рисуем подставку
        ctx.fillStyle = colors[length];
        ctx.fillRect(
            width / 2 - (items[index].standWidth * scale) / 2, //начальная координата X
            height - 1 * scale - margin, //начальная координата Y
            items[index].standWidth * scale, //ширина яруса
            1 * scale //высота яруса
        );
        margin = margin + 1 * scale;
        //перебираем и рисуем ярусы торта
        for (let i = length - 1; i >= 0; i--) {
            ctx.fillStyle = colors[i];
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillRect(
                width / 2 - (items[index].table[i].diameter * scale) / 2, //начальная координата X
                height - items[index].table[i].height * scale - margin, //начальная координата Y
                items[index].table[i].diameter * scale, //ширина яруса
                items[index].table[i].height * scale //высота яруса
            );
            margin = margin + Number(items[index].table[i].height * scale);
        }
        //рисуем систему коррдинат
        let mrg = height; //высота canvas
        let a = 0;
        ctx.font = '10px Hauora';
        //направляющие
        ctx.beginPath();
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 434);
        ctx.lineTo(width, 434);
        ctx.stroke();
        //горизонтальные линии с высотой (текст)
        for (let i = 0; i < 10; i++) {
            mrg = mrg - 434 / 10;
            a = a + 434 / 10;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(0, mrg);
            ctx.lineTo(width, mrg);
            ctx.stroke();
            ctx.fillStyle = '#CCCCCC';
            ctx.fillText((a / scale).toFixed(0), 3, mrg + 10);
        }
    };

    const calculationOrder = async () => {
        //расчитываем заказ пользователя
        let flag = false;
        if (isEdit && items[0].status === 'archive') {
            for (let i = 0; i < items[index].table.length; i++) {
                const a = recipe.findIndex((item) => {
                    return item._id === items[index].table[i].recipe.value;
                });
                if (a === -1) {
                    flag = true;
                    setText(
                        'Нельзя рассчитать заказ с рецептом которого не существует'
                    );
                    break;
                }
            }
        }
        if (items[index].table.length === 0) {
            flag = true;
            setText('Вы не заполнили параметры торта');
        } else {
            items[index].table.map((item) => {
                if (
                    item.diameter === '' ||
                    item.height === '' ||
                    item.indent === '' ||
                    item.recipe.value === ''
                ) {
                    flag = true;
                    setText('Вы заполнили не все параметры торта');
                }
            });
        }
        if (flag) {
            setModalActive(true);
        } else {
            try {
                setIsCake(true);
                const response = await OrdersService.calculationOrder({
                    ...items[index],
                    user: userId,
                });
                setData(response.data);
                items[index].calculation = response.data;
                calcPr(response.data);
                canvas();
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        }
    };

    const updateIndent = () => {
        let clone = JSON.parse(JSON.stringify(items));
        const a = clone[index].table;
        if (a[a.length - 1]) {
            a[a.length - 1].indent = standWidth - a[a.length - 1].diameter;
        }
        setItems([...clone]);
    };

    const addOrder = async () => {
        //добавляем либо сохраняем заказ
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
            !isEdit && resetSettings();
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
    };

    const deleteImage = (item) => {
        //удаляем картинку из стейтов
        const newImage = image.filter((a) => {
            return a !== item;
        });
        setImage(newImage);
        items[index].imagesUrl = newImage;
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
                                onBlur={() => {
                                    items[index].orderName = orderName;
                                }}
                            />
                            <div className={styles.informationInputBlock}>
                                <DatePicker
                                    locale="ru"
                                    placeholderText="Дата"
                                    selected={date}
                                    className={classNames(
                                        stylesInput.input,
                                        styles.informationInput
                                    )}
                                    onChange={(date) => {
                                        setDate(date);
                                        items[index].date = date?.toString();
                                    }}
                                />
                                <DatePicker
                                    locale="ru"
                                    placeholderText="Время"
                                    selected={time}
                                    onChange={(date) => {
                                        items[index].time = date?.toString();
                                        setTime(date);
                                    }}
                                    className={classNames(
                                        stylesInput.input,
                                        styles.informationInput
                                    )}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Время"
                                    dateFormat="h:mm aa"
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
                                onBlur={() => {
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
                                step="25"
                                className={classNames(
                                    styles.informationSlider,
                                    styles.slider
                                )}
                                value={range}
                                onChange={(e) => {
                                    setRange(e.target.value);
                                    items[index].range = e.target.value;
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
                                    Подставка, см.
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
                                        onBlur={() => {
                                            items[index].standWidth =
                                                standWidth;
                                            updateIndent();
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
                                        onBlur={() => {
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
                                    onBlur={() => {
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
                            <div
                                ref={cakeShapeRef}
                                style={{ overflow: 'auto' }}
                            >
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
                                            checked={cakeShape === 'circle'}
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
                                            checked={cakeShape === 'square'}
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
                                            checked={cakeShape === 'rectangle'}
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
                            <div ref={kindCakeRef} style={{ overflow: 'auto' }}>
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
                                            checked={kindCake === 'open-cake'}
                                            onChange={(e) => {
                                                setKindCake(e.target.value);
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
                                            checked={
                                                kindCake === 'buttercream-cake'
                                            }
                                            onChange={(e) => {
                                                setKindCake(e.target.value);
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
                                            checked={kindCake === 'cream-cake'}
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
                            <div ref={imageRef} style={{ overflow: 'auto' }}>
                                <div className={styles.informationImageBlock}>
                                    {drag ? (
                                        <span
                                            onDragStart={(e) =>
                                                dragStartHandler(e)
                                            }
                                            onDragLeave={(e) =>
                                                dragLeaveHandler(e)
                                            }
                                            onDragOver={(e) =>
                                                dragStartHandler(e)
                                            }
                                            onDrop={(e) => onDropHandler(e)}
                                            style={{
                                                fontSize: '12px',
                                                color: '#7a7a7a',
                                                borderColor: '#7a7a7a',
                                            }}
                                            className={classNames(
                                                styles.icon12
                                            )}
                                        >
                                            Отпустите
                                        </span>
                                    ) : (
                                        <span
                                            onDragStart={(e) =>
                                                dragStartHandler(e)
                                            }
                                            onDragLeave={(e) =>
                                                dragLeaveHandler(e)
                                            }
                                            onDragOver={(e) =>
                                                dragStartHandler(e)
                                            }
                                            className={classNames(
                                                styles.icon12
                                            )}
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
                                                className={
                                                    styles.informationImage
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.informationImageImg
                                                    }
                                                >
                                                    <Image
                                                        src={`${IMAGE_URL}${item}`}
                                                        alt=""
                                                        fill
                                                    />
                                                </div>
                                                <i
                                                    title="Удалить"
                                                    className={classNames(
                                                        'icon-11',
                                                        styles.informationImageDelete
                                                    )}
                                                    onClick={() =>
                                                        deleteImage(item)
                                                    }
                                                ></i>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div
                                className={classNames(
                                    'addBlock',
                                    styles.addBlock
                                )}
                            >
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
                                    {items[index].table.length < 10 && (
                                        <div
                                            className={classNames(
                                                'addBlock',
                                                styles.addBlock
                                            )}
                                        >
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
                                    )}
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
                            {!isEdit && (
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
                            )}
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
                </div>
                <div className={styles.cakeWrapper}>
                    {isCake === undefined ? (
                        ''
                    ) : isCake ? (
                        <div className={styles.cakeImage}>
                            <Canvas canvasRef={canvasRef} canvas={canvas} />
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
                </div>
                {total.length > 0 && (
                    <Total data={data} total={total} totalRef={totalRef} />
                )}
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                closeIcon={true}
            >
                <span className="icon-16"></span>
                <p className={classNames('text', styles.modalText)}>{text}</p>
                <button
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    style={{ marginTop: '14px' }}
                    onClick={() => {
                        setModalActive(false);
                        document.body.classList.remove('lock');
                    }}
                >
                    Понятно
                </button>
            </Modal>
            <Alert />
        </div>
    );
}

export { TabContent };
