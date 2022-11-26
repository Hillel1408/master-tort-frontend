import React from 'react';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Modal } from '../../components/Modal';
import { CustomSelect } from '../../components/CustomSelect';
import { Group } from '../../components/pages/recipes/Group';
import { Recipe } from '../../components/pages/recipes/Recipe';
import AuthService from '../../services/AuthService';
import RecipeService from '../../services/RecipeService';
import UploadService from '../../services/UploadService';
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

    const [drag, setDrag] = useState(false);

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

    const updateCountRecipe = (groupId, iter) => {
        //обновляем количество рецептов в рубрике +/-
        const item = group.find((item) => {
            return item._id === groupId;
        });
        iter
            ? (item.countRecipe = item.countRecipe + 1)
            : (item.countRecipe = item.countRecipe - 1);
    };

    const deleteRecipe = async (recipeId, groupId) => {
        //удаляем рецепт с сервера и стейта
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
            updateCountRecipe(groupId, false);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const deleteGroup = async (groupId) => {
        //удаляем рубрику на сервере и в стейте
        try {
            if (
                window.confirm(
                    'Вы действительно хотите удалить группу? Все рецепты данной группы будут удалены'
                )
            ) {
                const response = await RecipeService.deleteGroup(groupId);
                const newRecipe = recipe.filter((item) => {
                    //удаляем все рецепты удаленной группы
                    return item.group !== groupId;
                });
                const newGroup = group.filter((item) => {
                    return item._id !== groupId;
                });
                //делаем рубрику "все рецепты" активной и убираем сортировку
                setGroup(newGroup);
                setRecipe(newRecipe);
                setActive('');
                setFilterRecipe('');
            }
        } catch (e) {
            console.log(e.response?.data?.message);
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
        const getGroup = async (userId) => {
            //получаем рубрики пользователя
            try {
                const response = await RecipeService.getGroup(userId);
                setGroup(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        const getRecipe = async (userId) => {
            //получаем рецепты пользователя
            try {
                const response = await RecipeService.getRecipes(userId);
                setRecipe(response.data);
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
                getGroup(response.data.user.id);
                getRecipe(response.data.user.id);
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
                    onClick={() => setModalActiveGroup(true)}
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
                        Торты
                    </h2>
                    <div className={styles.cakesBlock}>
                        {filterRecipe
                            ? filterRecipe.map((item) => (
                                  <Recipe
                                      recipeName={item.recipeName}
                                      recipeUrl={item.recipeUrl}
                                      key={item._id}
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
                                  />
                              ))}
                    </div>
                    <div
                        className="addBlock"
                        onClick={() => setModalActiveRecipe(true)}
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
                <div className={styles.addRecipeModal}>
                    <span
                        className={classNames('title', styles.addRecipeTitle)}
                    >
                        Создание группы
                    </span>
                    <form>
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
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            Создать группу
                        </button>
                    </form>
                </div>
            </Modal>
            <Modal
                active={modalActiveRecipe}
                setActive={setModalActiveRecipe}
                closeIcon={true}
            >
                <div className={styles.addRecipeModal}>
                    <span
                        className={classNames('title', styles.addRecipeTitle)}
                    >
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
                                className={classNames('icon-12', styles.icon12)}
                            ></span>
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
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
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
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmitRecipe();
                        }}
                    >
                        Создать рецепт
                    </button>
                </div>
            </Modal>
        </Layout>
    );
}
