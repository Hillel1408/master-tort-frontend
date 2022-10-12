import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Recipe.module.scss';
import { NextFetchEvent } from 'next/server';

export default function Recipe() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Красный бархат" />
                <main className="main">
                    <span
                        className={classNames(
                            'icon-28',
                            'small-text',
                            styles.backLink
                        )}
                    >
                        <a href="#">Вернуться к рецептам</a>
                    </span>
                    <div className={styles.recipe}>
                        <div className={styles.recipe__products}>
                            <div className={stylesTable.table__overflow}>
                                <div
                                    className={classNames(
                                        stylesTable.table,
                                        'small-text'
                                    )}
                                >
                                    <div
                                        className={classNames(
                                            'text',
                                            stylesTable.tableThead
                                        )}
                                        style={{
                                            gridTemplateColumns:
                                                '44% 25% 25% 6%',
                                        }}
                                    >
                                        <div className={stylesTable.tableTh}>
                                            Продукты
                                        </div>
                                        <div className={stylesTable.tableTh}>
                                            Брутто
                                        </div>
                                        <div className={stylesTable.tableTh}>
                                            Нетто
                                        </div>
                                        <div
                                            className={stylesTable.tableTh}
                                        ></div>
                                    </div>
                                    <div className={stylesTable.table__block}>
                                        <div
                                            className={classNames(
                                                'text',
                                                stylesTable.table__title
                                            )}
                                        >
                                            Бисквит
                                        </div>
                                        <div className={stylesTable.tableTbody}>
                                            <div
                                                className={stylesTable.tableTr}
                                                style={{
                                                    gridTemplateColumns:
                                                        '44% 25% 25% 6%',
                                                }}
                                            >
                                                <div
                                                    className={
                                                        stylesTable.tableTd
                                                    }
                                                >
                                                    <input
                                                        type="number"
                                                        name=""
                                                        className="input"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        stylesTable.tableTd
                                                    }
                                                >
                                                    <input
                                                        type="number"
                                                        name=""
                                                        className="input"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        stylesTable.tableTd
                                                    }
                                                >
                                                    <input
                                                        type="number"
                                                        name=""
                                                        className="input"
                                                    />
                                                </div>
                                                <div
                                                    className={classNames(
                                                        stylesTable.tableTd,
                                                        stylesTable.tableTd__delete
                                                    )}
                                                >
                                                    <span
                                                        className={classNames(
                                                            'icon-11',
                                                            stylesTable.tableDelete
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
                        <div className={styles.recipe__image}>
                            <div className={styles.recipe__imageBlock}>
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
