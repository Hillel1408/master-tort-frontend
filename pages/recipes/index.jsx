import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { Modal } from '../../components/Modal';
import { CustomSelect } from '../../components/CustomSelect';
import { Group } from '../../components/pages/recipes/Group';
import { Recipe } from '../../components/pages/recipes/Recipe';
import { Confirm } from '../../components/Confirm';
import AuthService from '../../services/AuthService';
import RecipeService from '../../services/RecipeService';
import UploadService from '../../services/UploadService';
import OrdersService from '../../services/OrdersService';
import styles from './Recipes.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import Layout from '../../components/Layout';

export default function Recipes() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [modalActiveGroup, setModalActiveGroup] = useState(false);
    const [modalActiveRecipe, setModalActiveRecipe] = useState(false);
    const [groupIcon, setGroupIcon] = useState('');
    const [groupName, setGroupName] = useState('');
    const [group, setGroup] = useState('');
    const [groupSelect, setGroupSelect] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [recipe, setRecipe] = useState('');
    const [filterRecipe, setFilterRecipe] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('Отпустите');
    const [textImage, setTextImage] = useState('');
    const [active, setActive] = useState('');
    const [orders, setOrders] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [modal, setModal] = useState(false);
    const [textModal, setTextModal] = useState('');

    const [drag, setDrag] = useState(false);

    const [recipeId, setRecipeId] = useState('');
    const [gr, setGr] = useState('');

    const btnRef = useRef('');
    const btnRefRecipe = useRef('');
    const inputFileRef = useRef('');

    const options = [
        //опции для выпадающего списка выбора рубрики рецепта
        {
            value: 'icon-2',
            label: 'Торты',
            icon: <i className={classNames('icon-2', styles.icon2)}></i>,
        },
        {
            value: 'icon-17',
            label: 'Эклеры',
            icon: <i className={classNames('icon-17', styles.icon17)}></i>,
        },
        {
            value: 'icon-18',
            label: 'Выпечка',
            icon: <i className={classNames('icon-18', styles.icon18)}></i>,
        },
        {
            value: 'icon-19',
            label: 'Декор',
            icon: <i className={classNames('icon-19', styles.icon19)}></i>,
        },
        {
            value: 'icon-20',
            label: 'Капкейки',
            icon: <i className={classNames('icon-20', styles.icon20)}></i>,
        },
    ];

    const handleSubmit = async () => {
        //отправляем созданную рубрику на сервер и в стейт
        try {
            const newGroup = {
                userId: dataUser.id,
                groupName: groupName,
                groupIcon: groupIcon.value,
                countRecipe: 0,
            };
            const response = await RecipeService.setGroup(newGroup);
            setGroup([...group, response.data]);
            setModalActiveGroup(false);
            document.body.classList.remove('lock');
            setGroupIcon('');
            setGroupName('');
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const updateCountRecipe = (gr, iter) => {
        //обновляем количество рецептов в рубрике +/-
        const item = group.find((item) => {
            return item._id === gr;
        });
        iter
            ? (item.countRecipe = item.countRecipe + 1)
            : (item.countRecipe = item.countRecipe - 1);
    };

    const deleteRec = async () => {
        //удаляем рецепт с сервера и стейта
        setModal(false);
        document.body.classList.remove('lock');
        try {
            const response = await RecipeService.deleteRecipe(recipeId);
            const newRecipe = recipe.filter((item) => {
                return item._id !== recipeId;
            });
            setRecipe(newRecipe);
            if (filterRecipe) {
                //если рубрика удаленного рецепта в данный момент активна то удаляем рецепт и из нее
                const newRecipe = filterRecipe.filter((item) => {
                    return item._id !== recipeId;
                });
                setFilterRecipe(newRecipe);
            }
            updateCountRecipe(gr, false);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const deleteRecipe = async (recipeId) => {
        let flag = false;
        //проверяем используется ли рецепт в активных заказах
        Object.keys(orders).map((keyObj) => {
            if (typeof orders[keyObj] === 'object') {
                orders[keyObj].map((item) => {
                    item.table.map((a) => {
                        if (recipeId === a.recipe.value) flag = true;
                    });
                });
            }
        });
        if (flag) {
            setTextModal(
                'Нельзя удалить рецепт, который используется в активных заказах'
            );
            setModalActive(true);
        } else {
            setModal(true);
        }
    };

    const deleteGroup = async (groupId, active) => {
        //удаляем рубрику на сервере и в стейте
        const a = recipe.findIndex((item) => {
            return item.group === groupId;
        });
        if (a === -1) {
            try {
                const response = await RecipeService.deleteGroup(groupId);
                const newRecipe = recipe.filter((item) => {
                    //удаляем все рецепты удаленной группы
                    return item.group !== groupId;
                });
                const newGroup = group.filter((item) => {
                    return item._id !== groupId;
                });
                setGroup(newGroup);
                setRecipe(newRecipe);
                //делаем рубрику "все рецепты" активной и убираем сортировку, если удаляем активную рубрику
                if (active === groupId) {
                    setActive('');
                    setFilterRecipe('');
                }
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        } else {
            setTextModal('Нельзя удалить группу, в которой есть рецепты');
            setModalActive(true);
        }
    };

    const handleSubmitRecipe = async () => {
        //отправляем рецепт на сервер и в стейты
        try {
            const newRecipe = {
                userId: dataUser.id,
                group: groupId.value,
                recipeName: recipeName,
                recipeUrl: `http://localhost:5000${image}`,
            };
            const response = await RecipeService.setRecipe(newRecipe);
            setRecipe([...recipe, response.data]);
            updateCountRecipe(groupId.value, true);
            setModalActiveRecipe(false);
            document.body.classList.remove('lock');
            //если рубрика добавленного рецепта в данный момент активна то добавляем рецепт и в нее
            if (active === groupId.value)
                setFilterRecipe([...filterRecipe, response.data]);
            //обнуляем стейты
            setRecipeName('');
            setGroupId('');
            setDrag(false);
            setText('Отпустите');
            setTextImage('');
            setImage('');
        } catch (e) {
            console.log(e.response);
        }
    };

    const groupClickHandler = (e, groupId) => {
        //фильтруем рецепты в зависимости от выбранной рубрики
        if (e.target.closest(`.${styles.link}`)) {
            if (groupId) {
                //если клик не по рубрике "все рецепты"
                const newRecipe = recipe.filter((item) => {
                    return item.group === groupId;
                });
                setFilterRecipe(newRecipe);
            } else setFilterRecipe(''); //если клик по рубрике "все рецепты"
        }
    };

    const sendImage = async (file) => {
        //отправляем картинку рецепта на сервер
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await UploadService.set(formData);
            setImage(response.data.url);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const onDropHandler = async (e) => {
        //получаем картинку рецепта
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        //сохраняем название картинки для отображения на экране после загрузки
        setText(file.name);
        sendImage(file);
    };

    const handleChangeFile = async (e) => {
        //получаем картинку рецепта
        const file = e.target.files[0];
        //сохраняем название картинки для отображения на экране после загрузки
        setTextImage(file.name);
        sendImage(file);
    };

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    useEffect(() => {
        //формируем выпадающий список для выбора рубрики при создании рецепта
        if (group) {
            const newGroup = group.map((item) => {
                const newItem = {
                    value: item._id,
                    label: item.groupName,
                };
                return newItem;
            });
            setGroupSelect(newGroup);
        }
    }, [group]);

    useEffect(() => {
        //если какое-то поле из формы создания рубрики не заполнено, делаем кнопку не активной
        if (btnRef.current) {
            groupIcon !== '' && groupName !== ''
                ? (btnRef.current.disabled = false)
                : (btnRef.current.disabled = true);
        }
    }, [groupIcon, groupName]);

    useEffect(() => {
        //если какое-то поле из формы создания рецепта не заполнено, делаем кнопку не активной
        if (btnRefRecipe.current) {
            recipeName !== '' && groupId !== '' && image !== ''
                ? (btnRefRecipe.current.disabled = false)
                : (btnRefRecipe.current.disabled = true);
        }
    }, [recipeName, groupId, image]);

    useEffect(() => {
        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                response.data && setOrders(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const getRecipeGroup = async (userId) => {
            //получаем рецепты и группы пользователя
            try {
                const responseRecipe = await RecipeService.getRecipes(userId);
                setRecipe(responseRecipe.data);
                const responseGroup = await RecipeService.getGroup(userId);
                setGroup(responseGroup.data);
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
                getRecipeGroup(response.data.user.id);
                getOrders(response.data.user.id);
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
            title="Рецепты"
        >
            <Head>
                <title>Рецепты</title>
            </Head>
            <div className={styles.groups}>
                <h2 className={classNames('text', styles.groupsText)}>
                    Группы
                </h2>
                <div className={styles.groupsBlock}>
                    <Group
                        groupIcon="icon-1"
                        groupName="Все рецепты"
                        countRecipe={recipe.length}
                        groupId=""
                        active={active}
                        setActive={setActive}
                        groupClickHandler={groupClickHandler}
                    />
                    {group &&
                        group.map((item) => (
                            <Group
                                key={item._id}
                                groupIcon={item.groupIcon}
                                groupName={item.groupName}
                                countRecipe={item.countRecipe}
                                groupId={item._id}
                                active={active}
                                setActive={setActive}
                                groupClickHandler={groupClickHandler}
                                deleteGroup={deleteGroup}
                            />
                        ))}
                </div>
                <div
                    className="addBlock"
                    onClick={() => {
                        btnRef.current.disabled = true;
                        setModalActiveGroup(true);
                    }}
                >
                    <span
                        className={classNames(
                            'small-text',
                            'icon-8',
                            'popup-link'
                        )}
                        href="add-group"
                    >
                        Создать группы
                    </span>
                </div>
            </div>
            {group && (
                <div className={styles.cakes}>
                    <h2 className={classNames('text', styles.groupsText)}>
                        Рецепты
                    </h2>
                    <div className={styles.cakesBlock}>
                        {filterRecipe
                            ? filterRecipe.map((item) => (
                                  <Recipe
                                      key={item._id}
                                      recipeName={item.recipeName}
                                      recipeUrl={item.recipeUrl}
                                      setRecipeId={setRecipeId}
                                      setGr={setGr}
                                      deleteRecipe={deleteRecipe}
                                      recipeId={item._id}
                                      groupId={item.group}
                                  />
                              ))
                            : recipe &&
                              recipe.map((item) => (
                                  <Recipe
                                      recipeName={item.recipeName}
                                      recipeUrl={item.recipeUrl}
                                      key={item._id}
                                      deleteRecipe={deleteRecipe}
                                      recipeId={item._id}
                                      groupId={item.group}
                                      setGr={setGr}
                                      setRecipeId={setRecipeId}
                                  />
                              ))}
                    </div>
                    <div
                        className="addBlock"
                        onClick={() => {
                            btnRefRecipe.current.disabled = true;
                            setModalActiveRecipe(true);
                        }}
                    >
                        <span
                            className={classNames(
                                'small-text',
                                'icon-8',
                                'popup-link'
                            )}
                            href="add-recipe"
                        >
                            Создать рецепт
                        </span>
                    </div>
                </div>
            )}
            <Modal
                active={modalActiveGroup}
                setActive={setModalActiveGroup}
                closeIcon={true}
            >
                <span className={classNames('title', styles.addRecipeTitle)}>
                    Создание группы
                </span>
                <input
                    className={classNames(
                        stylesInput.input,
                        styles.addRecipeInput
                    )}
                    placeholder="Название"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <CustomSelect
                    options={options}
                    placeholder="Иконка"
                    isSearchable={false}
                    getOptionLabel={(props) => {
                        const { icon, label } = props;
                        return (
                            <div className={styles.selectFlex}>
                                {icon && icon}
                                <span>{label}</span>
                            </div>
                        );
                    }}
                    value={groupIcon}
                    setGroupIcon={setGroupIcon}
                    height="43px"
                    width="280px"
                />
                <p className={styles.addRecipeText}></p>
                <button
                    ref={btnRef}
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    onClick={(e) => {
                        handleSubmit();
                    }}
                >
                    Создать группу
                </button>
            </Modal>
            <Modal
                active={modalActiveRecipe}
                setActive={setModalActiveRecipe}
                closeIcon={true}
            >
                <span className={classNames('title', styles.addRecipeTitle)}>
                    Создание рецепта
                </span>
                <input
                    className={classNames(
                        stylesInput.input,
                        styles.addRecipeInput
                    )}
                    placeholder="Название"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                {groupSelect && (
                    <CustomSelect
                        options={groupSelect}
                        placeholder="Группа"
                        isSearchable={false}
                        value={groupId}
                        setGroupIcon={setGroupId}
                        height="43px"
                        width="280px"
                    />
                )}
                {drag ? (
                    <div className={styles.addRecipeBlock}>
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
                            {text}
                        </span>
                    </div>
                ) : (
                    <div className={styles.addRecipeBlock}>
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
                    </div>
                )}
                {textImage ? (
                    <p className={styles.addRecipeTextImage}>{textImage}</p>
                ) : (
                    <>
                        <div
                            className={classNames(
                                'addBlock',
                                styles.addRecipeAddBlock
                            )}
                        >
                            <span
                                onClick={() => inputFileRef.current.click()}
                                className={classNames('small-text', 'icon-8')}
                            >
                                Загрузить фото
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
                        <p className={styles.addRecipeTextImage}>
                            (.png, .jpg, .jpeg, не более 5Мб)
                        </p>
                    </>
                )}
                <button
                    ref={btnRefRecipe}
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    onClick={() => {
                        handleSubmitRecipe();
                    }}
                >
                    Создать рецепт
                </button>
            </Modal>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                closeIcon={true}
            >
                <span className="icon-16"></span>
                <p className={classNames('text', styles.modalText)}>
                    {textModal}
                </p>
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
            <Confirm modal={modal} setModal={setModal} func={deleteRec} />
        </Layout>
    );
}
