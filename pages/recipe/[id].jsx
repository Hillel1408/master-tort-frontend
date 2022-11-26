import classNames from 'classnames';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Recipe.module.scss';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AuthService from '../../services/AuthService';
import Link from 'next/link';
import RecipeService from '../../services/RecipeService';
import { Block } from '../../components/pages/recipe/Block';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Recipe() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [recipe, setRecipe] = useState('');
    const [block, setBlock] = useState([]);

    const blockValue = {
        title: 'Бисквит',
        products: [],
    };

    const thTitle = ['Продукт', 'Брутто', 'Нетто'];

    const clickHandler = () => {
        setBlock([...block, blockValue]);
    };

    const saveSettings = () => {};

    useEffect(() => {
        const getRecipe = async () => {
            //получаем рецепт пользователя
            try {
                const id = window.location.pathname.split('/recipe/')[1];
                const response = await RecipeService.getRecipe(id);
                setRecipe(response.data);
                setIsAuth(true);
                console.log(response);
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
                                        <div className={stylesTable.th}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={stylesTable.th}
                                    style={{ width: '22px' }}
                                ></div>
                            </div>
                            <div className={stylesTable.blockWrapper}>
                                {block &&
                                    block.map((item, index) => (
                                        <Block
                                            key={Math.random()}
                                            item={item}
                                            setBlock={setBlock}
                                            blockIndex={index}
                                            block={block}
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
                                        onClick={() => clickHandler()}
                                    >
                                        Добавить полуфабрикат
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={stylesTable.buttons}>
                        <div></div>
                        <button
                            className={classNames(
                                stylesBtn.btn,
                                stylesBtn.btn__secondary,
                                'small-text'
                            )}
                            href="#"
                            onClick={() => saveSettings()}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
                <div className={styles.image}>
                    <div className={styles.imageBlock}>
                        <img src={recipe.recipeUrl} />
                    </div>
                    <div className="addBlock">
                        <span className={classNames('icon-8', 'small-text')}>
                            Загрузить новое фото
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
