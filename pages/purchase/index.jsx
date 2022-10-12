import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Purchase.module.scss';

export default function Purchase() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Закупка" />
                <main className="main">
                    <div className={styles.purchase__columns}>
                        <div className={styles.purchase__column}>
                            <h2
                                className={classNames(
                                    'text',
                                    styles.purchase__title
                                )}
                            >
                                Выбранные заказы
                            </h2>
                            <div className={styles.purchase__orders}>
                                <OrderCake />
                                <OrderCake />
                                <OrderCake />
                            </div>
                            <div className="addBlock">
                                <span
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
                                >
                                    Добавить заказы
                                </span>
                            </div>
                        </div>
                        <div className={styles.purchase__column}>
                            <div className={stylesTable.table__overflow}>
                                <div
                                    className={classNames(
                                        stylesTable.table,
                                        'small-text',
                                        styles.purchase__table
                                    )}
                                    style={{ minWidth: '470px' }}
                                >
                                    <div
                                        className={classNames(
                                            'text',
                                            stylesTable.tableThead
                                        )}
                                        style={{
                                            gridTemplateColumns:
                                                '4% 32% 32% 32%',
                                        }}
                                    >
                                        <div className={stylesTable.tableTh}>
                                            <input type="checkbox" />
                                        </div>
                                        <div className={stylesTable.tableTh}>
                                            Наименование
                                        </div>
                                        <div className={stylesTable.tableTh}>
                                            Количество
                                        </div>
                                        <div className={stylesTable.tableTh}>
                                            Стоимость, ₽
                                        </div>
                                    </div>
                                    <div className={stylesTable.tableTbody}>
                                        <div
                                            className={classNames(
                                                stylesTable.tableTr,
                                                styles.active,
                                                styles.purchase__tableTr
                                            )}
                                            style={{
                                                gridTemplateColumns:
                                                    '4% 32% 32% 32%',
                                            }}
                                        >
                                            <div
                                                className={stylesTable.tableTd}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked
                                                />
                                            </div>
                                            <div
                                                className={stylesTable.tableTd}
                                            >
                                                <input
                                                    type="number"
                                                    name=""
                                                    className="input"
                                                />
                                            </div>
                                            <div
                                                className={stylesTable.tableTd}
                                            >
                                                <input
                                                    type="number"
                                                    name=""
                                                    className="input"
                                                />
                                            </div>
                                            <div
                                                className={stylesTable.tableTd}
                                            >
                                                <input
                                                    type="number"
                                                    name=""
                                                    className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.purchase__total}>
                                <p
                                    className={classNames(
                                        'text',
                                        styles.purchase__totalText
                                    )}
                                >
                                    Итоговая стоимость продуктов
                                </p>
                                <span
                                    className={classNames(
                                        'text',
                                        styles.purchase__totalPrice
                                    )}
                                >
                                    4260.80 ₽
                                </span>
                            </div>
                            <button
                                className={classNames('btn', 'small-text')}
                                href="#"
                            >
                                Печать
                            </button>
                        </div>
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
