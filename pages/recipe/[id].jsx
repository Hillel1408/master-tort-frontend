import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import uuid from 'react-uuid';
import Layout from '../../components/Layout';
import { Block } from '../../components/pages/recipe/Block';
import { Tooltip } from '../../components/Tooltip';
import AuthService from '../../services/AuthService';
import RecipeService from '../../services/RecipeService';
import ProductsService from '../../services/ProductsService';
import UploadService from '../../services/UploadService';
import styles from './Recipe.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import { Alert } from '../../components/Alert';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/cakeSlice';

export default function Recipe() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [recipe, setRecipe] = useState('');
    const [block, setBlock] = useState([]);
    const [select, setSelect] = useState('');
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [value, setValue] = useState('');
    const [image, setImage] = useState('');

    const inputFileRef = useRef('');

    const dispatch = useDispatch();

    const thTitle = ['Продукт', 'Брутто', 'Нетто'];

    const saveSettings = async () => {
        try {
            const values = {
                products: block,
                recipeUrl: image && `http://localhost:5000${image}`,
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
                setBlock(response.data.products);
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                getRecipe();
                getProducts(response.data.user.id);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title={recipe.recipeName}
        >
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
                                        onClick={(e) => setVisiblePopup(e)}
                                    >
                                        Добавить полуфабрикат
                                    </span>
                                    {visiblePopup && (
                                        <Tooltip
                                            style={styles.tooltiptext}
                                            visiblePopup={visiblePopup}
                                            setVisiblePopup={setVisiblePopup}
                                            close={true}
                                        >
                                            <input
                                                className={stylesInput.input}
                                                placeholder="Введите название"
                                                value={value}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
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
                <div className={styles.image}>
                    <div className={styles.imageBlock}>
                        {image ? (
                            <img src={`http://localhost:5000${image}`} />
                        ) : (
                            <img src={recipe.recipeUrl} />
                        )}
                    </div>
                    <div className="addBlock">
                        <span
                            onClick={() => inputFileRef.current.click()}
                            className={classNames('icon-8', 'small-text')}
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
            </div>
            <Alert />
        </Layout>
    );
}
