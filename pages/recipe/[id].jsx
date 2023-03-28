import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';
import uuid from 'react-uuid';
import Layout from '../../components/Layout';
import { Block } from '../../components/pages/recipe/Block';
import { Tooltip } from '../../components/Tooltip';
import { Checkbox } from '../../components/CustomCheckbox';
import { NoAccess } from '../../components/NoAccess';
import { Alert } from '../../components/Alert';
import { IMAGE_URL } from '../../http';
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
    const [isEdit, setIsEdit] = useState(true);

    const [checkbox, setCheckbox] = useState(false);
    const [isCream, setIsCream] = useState(false);
    const [exit, setExit] = useState(recipe.exit);
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [rings, setRings] = useState('');

    const [error, setError] = useState('');

    const inputFileRef = useRef('');
    const btnRef = useRef('');

    const dispatch = useDispatch();

    const { dataUser_2 } = useSelector((state) => state.cakes);

    const thTitle = ['Продукт', 'Брутто, гр.', 'Нетто, гр.'];

    const router = useRouter();

    useEffect(() => {
        //делаем кнопку "сохранить" не активной если данные не заполнены
        if (btnRef.current) {
            if (checkbox) {
                if (isCream) {
                    exit
                        ? (btnRef.current.disabled = false)
                        : (btnRef.current.disabled = true);
                } else
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
                isCream,
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
        //отправляем картинку на сервер
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
                setDiameter(response.data.diameter);
                setHeight(response.data.height);
                setIsCream(response.data.isCream);
                setCheckbox(response.data.checkbox);
                if (router.query.key) {
                    const storageItem = localStorage.getItem('recipes');
                    if (storageItem) {
                        const storage = JSON.parse(storageItem);
                        const flag = true;
                        Object.keys(storage).map((key) => {
                            if (storage[key].idRecipes === router.query.key) {
                                setBlock(storage[key].products);
                                setExit(
                                    (response.data.exit * storage[key].size) /
                                        response.data.totalVolume
                                );
                                setRings(storage[key].rings);
                                setIsEdit(false);
                                flag = false;
                            }
                        });
                        if (flag) {
                            setRecipe('');
                            setError(true);
                        }
                    } else {
                        setRecipe('');
                        setError(true);
                    }
                } else {
                    setBlock(response.data.products);
                    setExit(response.data.exit);
                }
            } catch (e) {
                console.log(e.response?.data?.message);
            } finally {
                setIsAuth(true);
            }
        };

        const checkAuth = () => {
            setDataUser(dataUser_2);
            getRecipe();
            getProducts(dataUser_2.id);
        };
        if (dataUser_2) checkAuth();
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
                    <span
                        className={classNames(
                            'icon-28',
                            'small-text',
                            styles.backLink
                        )}
                        onClick={() =>
                            isEdit
                                ? router.push('/recipes')
                                : router.push('/in-work')
                        }
                    >
                        {isEdit
                            ? 'Вернуться к рецептам'
                            : 'Вернуться к заказам'}
                    </span>
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
                                                    isEdit={isEdit}
                                                />
                                            ))}
                                        {isEdit && (
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
                                                        style={
                                                            styles.tooltiptext
                                                        }
                                                        visiblePopup={
                                                            visiblePopup
                                                        }
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
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            onKeyDown={
                                                                handleKey
                                                            }
                                                        />
                                                        <button
                                                            className={classNames(
                                                                stylesBtn.btn,
                                                                stylesBtn.btn__secondary,
                                                                'small-text'
                                                            )}
                                                            style={{
                                                                width: '100%',
                                                                marginTop:
                                                                    '10px',
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
                                        )}
                                    </div>
                                </div>
                            </div>
                            {isEdit && (
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
                            )}
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
                                {isEdit && (
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
                                )}
                            </div>

                            <div className={styles.params}>
                                <div
                                    className={stylesTable.titleWrapper}
                                    style={{ marginBottom: '20px' }}
                                >
                                    Параметры
                                </div>
                                {isEdit ? (
                                    <div className={styles.grid}>
                                        <div className={styles.paramsBlock}>
                                            <div>
                                                <div
                                                    className={
                                                        styles.paramsFlex
                                                    }
                                                >
                                                    <Checkbox
                                                        checkbox={checkbox}
                                                        clickHandler={() =>
                                                            setCheckbox(
                                                                !checkbox
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        onClick={() =>
                                                            setCheckbox(
                                                                !checkbox
                                                            )
                                                        }
                                                        className="small-text"
                                                    >
                                                        Использовать в расчетах
                                                    </span>
                                                </div>
                                                {checkbox && (
                                                    <div
                                                        className={
                                                            styles.paramsFlex
                                                        }
                                                    >
                                                        <Checkbox
                                                            checkbox={isCream}
                                                            clickHandler={() =>
                                                                setIsCream(
                                                                    !isCream
                                                                )
                                                            }
                                                        />
                                                        <span
                                                            onClick={() =>
                                                                setIsCream(
                                                                    !isCream
                                                                )
                                                            }
                                                            className="small-text"
                                                        >
                                                            Выравнивающий крем
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
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
                                                {!isCream && (
                                                    <>
                                                        <input
                                                            title="Диаметр, см."
                                                            type="number"
                                                            placeholder="Диаметр, см."
                                                            value={diameter}
                                                            onChange={(e) =>
                                                                setDiameter(
                                                                    e.target
                                                                        .value
                                                                )
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
                                                                setHeight(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={classNames(
                                                                stylesInput.input
                                                            )}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className={classNames(
                                            'small-text',
                                            styles.ringsBlock
                                        )}
                                    >
                                        <p className={styles.rings}>
                                            Ярусы:
                                            {rings &&
                                                rings.map((item, index) => (
                                                    <span key={index}>
                                                        {item}
                                                    </span>
                                                ))}
                                        </p>
                                        <p className={styles.rings}>
                                            Выход:{' '}
                                            <span>{exit.toFixed(0)} гр.</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : error ? (
                <NoAccess
                    title={'Ссылка больше не действительна'}
                    text={
                        'Перейдите в раздел "В работе" и откройте нужный рецепт'
                    }
                    linkBtn={'/in-work'}
                    textBtn={'Перейти'}
                />
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
