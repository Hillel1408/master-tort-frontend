import React from 'react';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Oval } from 'react-loader-spinner';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { CustomSelect } from '../../components/CustomSelect';
import { NoAccess } from '../../components/NoAccess';
import { Group } from './Group';
import { Recipe } from './Recipe';
import AuthService from '../../services/AuthService';
import RecipeService from '../../services/RecipeService';
import UploadService from '../../services/UploadService';
import stylesHeader from '../../components/Header/Header.module.scss';
import styles from './Recipes.module.scss';
import stylesLogin from '../login/Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

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
    const [active, setActive] = useState('');

    const [drag, setDrag] = useState(false);

    const btnRef = useRef('');
    const btnRefRecipe = useRef('');
    const inputFileRef = useRef('');

    const options = [
        {
            value: 'icon-2',
            label: 'Торты',
            icon: <i className={classNames('icon-2', styles.icon2)}></i>,
            id: '123124',
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

    const updateCountRecipe = () => {
        const item = group.find((item) => {
            return item._id === groupId.value;
        });
        item.countRecipe = item.countRecipe + 1;
    };

    const deleteRecipe = () => {};

    const deleteGroup = () => {};

    const handleSubmitRecipe = async () => {
        try {
            const newRecipe = {
                userId: dataUser.id,
                group: groupId.value,
                recipeName: recipeName,
                recipeUrl: `http://localhost:5000${image}`,
            };
            const response = await RecipeService.setRecipe(newRecipe);
            setRecipe([...recipe, response.data]);
            updateCountRecipe();
            setModalActiveRecipe(false);
            document.body.classList.remove('lock');
            if (active === groupId.value) {
                setFilterRecipe([...filterRecipe, response.data]);
            }
            setRecipeName('');
            setGroupId('');
            setDrag(false);
            setText('Отпустите');
            setImage('');
        } catch (e) {
            console.log(e.response);
        }
    };

    const groupClickHandler = (e, dataset) => {
        if (e.target.closest('.groupLink')) {
            if (dataset) {
                const newRecipe = recipe.filter((item) => {
                    return item.group === dataset;
                });
                setFilterRecipe(newRecipe);
            } else setFilterRecipe('');
        }
    };

    const sendImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            setText(file.name);
            const response = await UploadService.set(formData);
            setImage(response.data.url);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const onDropHandler = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        sendImage(file);
    };

    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
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
        groupIcon !== '' && groupName !== ''
            ? (btnRef.current.disabled = false)
            : (btnRef.current.disabled = true);
    }, [groupIcon, groupName]);

    useEffect(() => {
        recipeName !== '' && groupId !== '' && image !== ''
            ? (btnRefRecipe.current.disabled = false)
            : (btnRefRecipe.current.disabled = true);
    }, [recipeName, groupId, image]);

    useEffect(() => {
        const getGroup = async (userId) => {
            try {
                const response = await RecipeService.getGroup(userId);
                setGroup(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        const getRecipe = async (userId) => {
            try {
                const response = await RecipeService.getRecipe(userId);
                setRecipe(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                setIsAuth(true);
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
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <header className={stylesHeader.root}>
                    <h1 className={classNames('title', stylesHeader.title)}>
                        Рецепты
                    </h1>
                    {isAuth !== '' ? (
                        <Header
                            userName={dataUser.fullName}
                            isAuth={isAuth}
                            setIsAuth={setIsAuth}
                        />
                    ) : (
                        <Oval
                            height={40}
                            width={40}
                            color="#009998"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#7a7a7a"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    )}
                </header>
                <main className="main">
                    {isAuth !== '' ? (
                        isAuth ? (
                            <>
                                <div className={styles.groups}>
                                    <h2
                                        className={classNames(
                                            'text',
                                            styles.groupsText
                                        )}
                                    >
                                        Группы
                                    </h2>
                                    <div className={styles.groupsBlock}>
                                        <Group
                                            groupIcon="icon-1"
                                            groupName="Все рецепты"
                                            countRecipe={recipe.length}
                                            dataset=""
                                            active={active}
                                            setActive={setActive}
                                            groupClickHandler={
                                                groupClickHandler
                                            }
                                        />
                                        {group &&
                                            group.map((item) => (
                                                <Group
                                                    key={item._id}
                                                    groupIcon={item.groupIcon}
                                                    groupName={item.groupName}
                                                    countRecipe={
                                                        item.countRecipe
                                                    }
                                                    dataset={item._id}
                                                    active={active}
                                                    setActive={setActive}
                                                    groupClickHandler={
                                                        groupClickHandler
                                                    }
                                                />
                                            ))}
                                    </div>
                                    <div
                                        className="addBlock"
                                        onClick={() =>
                                            setModalActiveGroup(true)
                                        }
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
                                        <h2
                                            className={classNames(
                                                'text',
                                                styles.groupsText
                                            )}
                                        >
                                            Торты
                                        </h2>
                                        <div className={styles.cakesBlock}>
                                            {filterRecipe
                                                ? filterRecipe.map((item) => (
                                                      <Recipe
                                                          recipeName={
                                                              item.recipeName
                                                          }
                                                          recipeUrl={
                                                              item.recipeUrl
                                                          }
                                                          key={item._id}
                                                      />
                                                  ))
                                                : recipe &&
                                                  recipe.map((item) => (
                                                      <Recipe
                                                          recipeName={
                                                              item.recipeName
                                                          }
                                                          recipeUrl={
                                                              item.recipeUrl
                                                          }
                                                          key={item._id}
                                                      />
                                                  ))}
                                        </div>
                                        <div
                                            className="addBlock"
                                            onClick={() =>
                                                setModalActiveRecipe(true)
                                            }
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
                            </>
                        ) : (
                            <NoAccess
                                title={'Доступ закрыт'}
                                text={
                                    'Зарегистрируйтесь или войдите в учетную запись, чтобы использовать все возможности сервиса'
                                }
                                linkBtn={'/login'}
                                textBtn={'Войти'}
                            />
                        )
                    ) : (
                        <div className={stylesLogin.wrapper}>
                            <Oval
                                height={40}
                                width={40}
                                color="#009998"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#7a7a7a"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    )}
                </main>
                <br></br>
                <br></br>
            </div>
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
                                    fontSize: '14px',
                                    color: 'var(--textColor)',
                                    borderColor: 'var(--textColor)',
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
                    <p className={styles.addRecipeText}>
                        (.png, .jpg, .jpeg, не более 5Мб)
                    </p>
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
        </div>
    );
}
