import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Oval } from 'react-loader-spinner';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { CustomSelect } from '../../components/CustomSelect';
import { NoAccess } from '../../components/NoAccess';
import { Group } from './Group';
import AuthService from '../../services/AuthService';
import RecipeService from '../../services/RecipeService';
import stylesHeader from '../../components/Header/Header.module.scss';
import styles from './Recipes.module.scss';
import stylesLogin from '../login/Login.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';

export default function Recipes() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [modalActiveGroup, setModalActiveGroup] = useState(false);
    const [modalActiveRecipe, setModalActiveRecipe] = useState(false);
    const [groupIcon, setGroupIcon] = useState('');
    const [groupName, setGroupName] = useState('');
    const [group, setGroup] = useState('');

    const btnRef = React.useRef('');

    const handleSubmit = async () => {
        try {
            const newGroup = {
                userId: dataUser.id,
                groupName: groupName,
                groupIcon: groupIcon.value,
                countRecipe: 0,
            };
            const response = await RecipeService.setGroup(newGroup);
            setGroup([...group, newGroup]);
            setModalActiveGroup(false);
            document.body.classList.remove('lock');
            setGroupIcon('');
            setGroupName('');
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const options = [
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

    useEffect(() => {
        groupIcon !== '' && groupName !== ''
            ? (btnRef.current.disabled = false)
            : (btnRef.current.disabled = true);
    }, [groupIcon, groupName]);

    useEffect(() => {
        const getGroup = async (userId) => {
            try {
                const response = await RecipeService.getGroup(userId);
                setGroup(response.data);
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
                                        {group &&
                                            group.map((item) => (
                                                <Group
                                                    key={item._id}
                                                    groupIcon={item.groupIcon}
                                                    groupName={item.groupName}
                                                    countRecipe={
                                                        item.countRecipe
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
                                        <Link href="/recipe">
                                            <a className={styles.link}>
                                                <div
                                                    className={styles.cakesItem}
                                                >
                                                    <span
                                                        className={classNames(
                                                            'small-text',
                                                            styles.smallText
                                                        )}
                                                    >
                                                        Красный бархат
                                                    </span>
                                                    <div
                                                        className={
                                                            styles.cakesImage
                                                        }
                                                    >
                                                        <img src="1.jpg" />
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
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
                        <div
                            className={classNames(
                                'addBlock',
                                styles.addRecipeAddBlock
                            )}
                        >
                            <span
                                className={classNames('small-text', 'icon-8')}
                            >
                                Загрузить миниатюру
                            </span>
                        </div>
                        <p className={styles.addRecipeText}>
                            (.png, .jpg, .jpeg, не более 5Мб)
                        </p>
                        <button
                            ref={btnRef}
                            className={classNames(
                                'btn',
                                'btn__secondary',
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
                        type="text"
                        name="recipe-name"
                        placeholder="Название"
                    />
                    <select
                        className={classNames(
                            stylesInput.input,
                            'select',
                            styles.addRecipeSelect
                        )}
                    >
                        <option>Торты</option>
                        <option>Десерты</option>
                        <option>Хлеб</option>
                    </select>
                    <div className={styles.addRecipeBlock}>
                        <span
                            className={classNames('icon-12', styles.icon12)}
                        ></span>
                    </div>
                    <div
                        className={classNames(
                            'addBlock',
                            styles.addRecipeAddBlock
                        )}
                    >
                        <span className={classNames('small-text', 'icon-8')}>
                            Загрузить фото
                        </span>
                    </div>
                    <p className={styles.addRecipeText}>
                        (.png, .jpg, .jpeg, не более 5Мб)
                    </p>
                    <button
                        className={classNames(
                            'btn',
                            'btn__secondary',
                            'small-text'
                        )}
                        href="#"
                    >
                        Создать рецепт
                    </button>
                </div>
            </Modal>
        </div>
    );
}
