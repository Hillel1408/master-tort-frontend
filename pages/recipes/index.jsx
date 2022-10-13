import Link from 'next/link';
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
                    <div className={styles.groups}>
                        <h2 className={classNames('text', styles.groupsText)}>
                            Группы
                        </h2>
                        <div className={styles.groupsBlock}>
                            <a href="#" className={styles.link}>
                                <div className={styles.groupsItem}>
                                    <span
                                        className={classNames(
                                            'icon-13',
                                            styles.groupsIcon
                                        )}
                                    ></span>
                                    <p
                                        className={classNames(
                                            'small-text',
                                            styles.smallText
                                        )}
                                    >
                                        Торты
                                    </p>
                                    <span className={styles.groupsCount}>
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
                    <div className={styles.cakes}>
                        <h2 className={classNames('text', styles.groupsText)}>
                            Торты
                        </h2>
                        <div className={styles.cakesBlock}>
                            <Link href="/recipe">
                                <a className={styles.link}>
                                    <div className={styles.cakesItem}>
                                        <span
                                            className={classNames(
                                                'small-text',
                                                styles.smallText
                                            )}
                                        >
                                            Красный бархат
                                        </span>
                                        <div className={styles.cakesImage}>
                                            <img src="1.jpg" />
                                        </div>
                                    </div>
                                </a>
                            </Link>
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
                    <input
                        className={classNames('input', styles.addRecipeInput)}
                        type="text"
                        name="group-name"
                        placeholder="Название"
                    />
                    <select
                        className={classNames(
                            'input',
                            'select',
                            styles.addRecipeSelect
                        )}
                    >
                        <option>Торты</option>
                        <option>Десерты</option>
                        <option>Хлеб</option>
                    </select>
                    <div
                        className={classNames(
                            'addBlock',
                            styles.addRecipeAddBlock
                        )}
                    >
                        <span className={classNames('small-text', 'icon-8')}>
                            Загрузить миниатюру
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
                        Создать группу
                    </button>
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
                        className={classNames('input', styles.addRecipeInput)}
                        type="text"
                        name="recipe-name"
                        placeholder="Название"
                    />
                    <select
                        className={classNames(
                            'input',
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
