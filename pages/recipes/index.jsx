import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import styles from './Recipes.module.scss';
import { useState } from 'react';

export default function Recipes() {
    const [modalActiveGroup, setModalActiveGroup] = useState(false);
    const [modalActiveRecipe, setModalActiveRecipe] = useState(false);
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Рецепты" />
                <main className="main">
                    <div className={styles.recipesGroups}>
                        <h2
                            className={classNames(
                                'text',
                                styles.recipesGroupsText
                            )}
                        >
                            Группы
                        </h2>
                        <div className={styles.recipesGroups__block}>
                            <a href="#" className={styles.recipesLink}>
                                <div className={styles.recipesGroups__item}>
                                    <span
                                        className={classNames(
                                            'icon-13',
                                            styles.recipesGroups__icon
                                        )}
                                    ></span>
                                    <p
                                        className={classNames(
                                            'small-text',
                                            styles.recipes__smallText
                                        )}
                                    >
                                        Торты
                                    </p>
                                    <span
                                        className={styles.recipesGroups__count}
                                    >
                                        21
                                    </span>
                                </div>
                            </a>
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
                    <div className={styles.recipesCakes}>
                        <h2
                            className={classNames(
                                'text',
                                styles.recipesGroupsText
                            )}
                        >
                            Торты
                        </h2>
                        <div className={styles.recipesCakes__block}>
                            <a href="#" className={styles.recipesLink}>
                                <div className={styles.recipesCakes__item}>
                                    <span
                                        className={classNames(
                                            'small-text',
                                            styles.recipes__smallText
                                        )}
                                    >
                                        Красный бархат
                                    </span>
                                    <div className={styles.recipesCakes__image}>
                                        <img src="1.jpg" />
                                    </div>
                                </div>
                            </a>
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
                </main>
                <br></br>
                <br></br>
            </div>
            <Modal active={modalActiveGroup} setActive={setModalActiveGroup}>
                <div className={styles.addRecipe__modal}>
                    <span
                        className={classNames('title', styles.addRecipe__title)}
                    >
                        Создание группы
                    </span>
                    <input
                        className={classNames('input', styles.addRecipe__input)}
                        type="text"
                        name="group-name"
                        placeholder="Название"
                    />
                    <select
                        className={classNames(
                            'input',
                            'select',
                            styles.addRecipe__select
                        )}
                    >
                        <option>Торты</option>
                        <option>Десерты</option>
                        <option>Хлеб</option>
                    </select>
                    <div
                        className={classNames(
                            'addBlock',
                            styles.addRecipe__addBlock
                        )}
                    >
                        <span className={classNames('small-text', 'icon-8')}>
                            Загрузить миниатюру
                        </span>
                    </div>
                    <p className={styles.addRecipe__text}>
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
                        Создать группу
                    </button>
                </div>
            </Modal>
            <Modal active={modalActiveRecipe} setActive={setModalActiveRecipe}>
                <div className={styles.addRecipe__modal}>
                    <span
                        className={classNames('title', styles.addRecipe__title)}
                    >
                        Создание рецепта
                    </span>
                    <input
                        className={classNames('input', styles.addRecipe__input)}
                        type="text"
                        name="recipe-name"
                        placeholder="Название"
                    />
                    <select
                        className={classNames(
                            'input',
                            'select',
                            styles.addRecipe__select
                        )}
                    >
                        <option>Торты</option>
                        <option>Десерты</option>
                        <option>Хлеб</option>
                    </select>
                    <div className={styles.addRecipe__block}>
                        <span
                            className={classNames('icon-12', styles.icon12)}
                        ></span>
                    </div>
                    <div
                        className={classNames(
                            'addBlock',
                            styles.addRecipe__addBlock
                        )}
                    >
                        <span className={classNames('small-text', 'icon-8')}>
                            Загрузить фото
                        </span>
                    </div>
                    <p className={styles.addRecipe__text}>
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
