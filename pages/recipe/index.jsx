import Router from 'next/router';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Recipe.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';

export default function Recipe() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Красный бархат" />
                <main className="main">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            Router.back();
                        }}
                    >
                        <span
                            className={classNames(
                                'icon-28',
                                'small-text',
                                styles.backLink
                            )}
                        >
                            Вернуться к рецептам
                        </span>
                    </a>
                    <div className={styles.root}>
                        <div className={styles.products}>
                            <div className={stylesTable.overflow}>
                                <div
                                    className={classNames(
                                        stylesTable.table,
                                        'small-text'
                                    )}
                                >
                                    <div
                                        className={classNames(
                                            'text',
                                            stylesTable.thead
                                        )}
                                        style={{
                                            gridTemplateColumns:
                                                '44% 25% 25% 6%',
                                        }}
                                    >
                                        <div className={stylesTable.th}>
                                            Продукты
                                        </div>
                                        <div className={stylesTable.th}>
                                            Брутто
                                        </div>
                                        <div className={stylesTable.th}>
                                            Нетто
                                        </div>
                                        <div className={stylesTable.th}></div>
                                    </div>
                                    <div className={stylesTable.block}>
                                        <div
                                            className={classNames(
                                                'text',
                                                stylesTable.title
                                            )}
                                        >
                                            Бисквит
                                        </div>
                                        <div className={stylesTable.tbody}>
                                            <div
                                                className={stylesTable.tr}
                                                style={{
                                                    gridTemplateColumns:
                                                        '44% 25% 25% 6%',
                                                }}
                                            >
                                                <div className={stylesTable.td}>
                                                    <input
                                                        type="number"
                                                        name=""
                                                        className={
                                                            stylesInput.input
                                                        }
                                                    />
                                                </div>
                                                <div className={stylesTable.td}>
                                                    <input
                                                        type="number"
                                                        name=""
                                                        className={
                                                            stylesInput.input
                                                        }
                                                    />
                                                </div>
                                                <div className={stylesTable.td}>
                                                    <input
                                                        type="number"
                                                        name=""
                                                        className={
                                                            stylesInput.input
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={classNames(
                                                        stylesTable.td,
                                                        stylesTable.tdDelete
                                                    )}
                                                >
                                                    <span
                                                        className={classNames(
                                                            'icon-11',
                                                            stylesTable.delete
                                                        )}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
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
                                            >
                                                Добавить продукт
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="addBlock">
                                <span
                                    className={classNames(
                                        'icon-8',
                                        'small-text'
                                    )}
                                >
                                    Добавить полуфабрикат
                                </span>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <div className={styles.imageBlock}>
                                <img src="3.jpg" />
                            </div>
                            <div className="addBlock">
                                <span
                                    className={classNames(
                                        'icon-8',
                                        'small-text'
                                    )}
                                >
                                    Загрузить новое фото
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
