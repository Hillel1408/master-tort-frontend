import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { parseCookies, setCookie } from 'nookies';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import uuid from 'react-uuid';
import Layout from '../../components/Layout';
import { Block } from '../../components/pages/recipe/Block';
import { Tooltip } from '../../components/Tooltip';
import { Checkbox } from '../../components/CustomCheckbox';
import { Alert } from '../../components/Alert';
import { IMAGE_URL } from '../../http';
import AuthService from '../../services/AuthService';
import RecipeService from '../../services/RecipeService';
import ProductsService from '../../services/ProductsService';
import UploadService from '../../services/UploadService';
import { setAlert } from '../../redux/cakeSlice';
import styles from './Recipe.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';

export default function Recipe() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [recipe, setRecipe] = useState('');
    const [block, setBlock] = useState([]);
    const [select, setSelect] = useState('');
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [value, setValue] = useState('');
    const [image, setImage] = useState('');

    const [checkbox, setCheckbox] = useState(false);
    const [exit, setExit] = useState(recipe.exit);
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');

    const inputFileRef = useRef('');
    const btnRef = useRef('');

    const dispatch = useDispatch();

    const thTitle = ['Продукт', 'Брутто, гр.', 'Нетто, гр.'];

    useEffect(() => {
        //делаем кнопку "сохранить" не активной если данные не заполнены
        if (btnRef.current) {
            if (checkbox) {
                exit && height && diameter
                    ? (btnRef.current.disabled = false)
                    : (btnRef.current.disabled = true);
            } else btnRef.current.disabled = false;
        }
    }, [exit, height, diameter, checkbox]);

    const saveSettings = async () => {
        //сохраняем рецепт пользователя
        try {
            const values = {
                products: block,
                checkbox,
                exit,
                height,
                diameter,
                recipeUrl: image && `${IMAGE_URL}${image}`,
            };
            const id = window.location.pathname.split('/recipe/')[1];
            const response = await RecipeService.updateRecipe(id, values);
            dispatch(
                setAlert({
                    text: 'Рецепт успешно сохранен',
                    color: '#62ac62',
                })
            );
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        //добавляем полуфабрикат
        const id = uuid();
        setBlock([
            ...block,
            {
                id: id,
                title: `${value}`,
                products: [],
            },
        ]);
        setVisiblePopup('');
        setValue('');
    };

    const sendImage = async (file) => {
        //отправляем аватар на сервер
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await UploadService.set(formData);
            setImage(response.data.url);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const handleChangeFile = async (e) => {
        //получаем картинку рецепта
        const file = e.target.files[0];
        sendImage(file);
    };

    useEffect(() => {
        const getProducts = async (id) => {
            //получаем продукты пользователя
            try {
                const response = await ProductsService.get(id);
                //формируем значения выпадающего списка с продуктами
                const select = [];
                response.data.products.map((item) => {
                    select.push({
                        value: item.id,
                        label: item.name,
                    });
                });
                setSelect(select);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const getRecipe = async () => {
            //получаем рецепт пользователя
            try {
                const id = window.location.pathname.split('/recipe/')[1];
                const response = await RecipeService.getRecipe(id);
                setRecipe(response.data);
                setExit(response.data.exit);
                setDiameter(response.data.diameter);
                setHeight(response.data.height);
                setCheckbox(response.data.checkbox);
                setBlock(response.data.products);
                console.log(response.data.products);
            } catch (e) {
                console.log(e.response?.data?.message);
            } finally {
                setIsAuth(true);
            }
        };

        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                //localStorage.setItem('token', response.data.accessToken);
                setCookie(null, 'token', response.data.accessToken, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                setDataUser(response.data.user);
                getRecipe();
                getProducts(response.data.user.id);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (parseCookies().token) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title={recipe.recipeName}
        >
            {recipe ? (
                <>
                    <Link href="/recipes">
                        <span
                            className={classNames(
                                'icon-28',
                                'small-text',
                                styles.backLink
                            )}
                        >
                            Вернуться к рецептам
                        </span>
                    </Link>
                    <div className={styles.root}>
                        <div className={styles.products}>
                            <div className={stylesTable.overflow}>
                                <div
                                    className={classNames(
                                        stylesTable.table,
                                        'small-text'
                                    )}
                                >
                                    <div className={stylesTable.wrapperHead}>
                                        <div
                                            className={classNames(
                                                'text',
                                                stylesTable.thead
                                            )}
                                            style={{
                                                gridTemplateColumns:
                                                    '33.33% 33.33% 33.33%',
                                            }}
                                        >
                                            {thTitle.map((item) => (
                                                <div
                                                    key={item}
                                                    className={stylesTable.th}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className={stylesTable.th}
                                            style={{ width: '19px' }}
                                        ></div>
                                    </div>
                                    <div className={stylesTable.blockWrapper}>
                                        {block &&
                                            block.map((item, index) => (
                                                <Block
                                                    key={item.id}
                                                    item={item}
                                                    setBlock={setBlock}
                                                    blockIndex={index}
                                                    block={block}
                                                    select={select}
                                                />
                                            ))}
                                        <div
                                            className={classNames(
                                                'addBlock',
                                                stylesTable.addBlock
                                            )}
                                        >
                                            <span
                                                className={classNames(
                                                    'icon-8',
                                                    'small-text'
                                                )}
                                                onClick={(e) =>
                                                    setVisiblePopup(e)
                                                }
                                            >
                                                Добавить полуфабрикат
                                            </span>
                                            {visiblePopup && (
                                                <Tooltip
                                                    style={styles.tooltiptext}
                                                    visiblePopup={visiblePopup}
                                                    setVisiblePopup={
                                                        setVisiblePopup
                                                    }
                                                    close={true}
                                                >
                                                    <input
                                                        className={
                                                            stylesInput.input
                                                        }
                                                        placeholder="Введите название"
                                                        value={value}
                                                        onChange={(e) =>
                                                            setValue(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyDown={handleKey}
                                                    />
                                                    <button
                                                        className={classNames(
                                                            stylesBtn.btn,
                                                            stylesBtn.btn__secondary,
                                                            'small-text'
                                                        )}
                                                        style={{
                                                            width: '100%',
                                                            marginTop: '10px',
                                                        }}
                                                        onClick={() => {
                                                            if (value) {
                                                                handleSubmit();
                                                            }
                                                        }}
                                                    >
                                                        Добавить
                                                    </button>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={stylesTable.buttons}>
                                <button
                                    ref={btnRef}
                                    className={classNames(
                                        stylesBtn.btn,
                                        stylesBtn.btn__secondary,
                                        'small-text'
                                    )}
                                    onClick={() => saveSettings()}
                                >
                                    Сохранить
                                </button>
                                <div></div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.image}>
                                <div className={styles.imageBlock}>
                                    {image ? (
                                        <Image
                                            src={`${IMAGE_URL}${image}`}
                                            fill
                                            alt=""
                                        />
                                    ) : (
                                        <Image
                                            src={recipe.recipeUrl}
                                            fill
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div className="addBlock">
                                    <span
                                        onClick={() =>
                                            inputFileRef.current.click()
                                        }
                                        className={classNames(
                                            'icon-8',
                                            'small-text'
                                        )}
                                    >
                                        Загрузить новое фото
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
                            <div className={styles.params}>
                                <div
                                    className={stylesTable.titleWrapper}
                                    style={{ marginBottom: '20px' }}
                                >
                                    Параметры
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.paramsBlock}>
                                        <Checkbox
                                            checkbox={checkbox}
                                            clickHandler={() =>
                                                setCheckbox(!checkbox)
                                            }
                                        />
                                        <span
                                            onClick={() =>
                                                setCheckbox(!checkbox)
                                            }
                                            className="small-text"
                                        >
                                            Использовать в расчетах
                                        </span>
                                    </div>
                                    {checkbox && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '10px',
                                            }}
                                        >
                                            <input
                                                title="Выход, гр."
                                                type="number"
                                                placeholder="Выход, гр."
                                                value={exit}
                                                onChange={(e) =>
                                                    setExit(e.target.value)
                                                }
                                                className={classNames(
                                                    stylesInput.input
                                                )}
                                            />
                                            <input
                                                title="Диаметр, см."
                                                type="number"
                                                placeholder="Диаметр, см."
                                                value={diameter}
                                                onChange={(e) =>
                                                    setDiameter(e.target.value)
                                                }
                                                className={classNames(
                                                    stylesInput.input
                                                )}
                                            />
                                            <input
                                                title="Высота, см."
                                                type="number"
                                                placeholder="Высота, см."
                                                value={height}
                                                onChange={(e) =>
                                                    setHeight(e.target.value)
                                                }
                                                className={classNames(
                                                    stylesInput.input
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h2
                    className={classNames(
                        'title',
                        stylesNoAccess.noOrders,
                        stylesNoAccess.title
                    )}
                >
                    Ошибка загрузки данных
                </h2>
            )}
            <Alert />
        </Layout>
    );
}
