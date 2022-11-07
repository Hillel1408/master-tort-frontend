import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import stylesTable from '../../components/Table/Table.module.scss';
import styles from './Purchase.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Purchase() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Закупка" />
                <main className="main">
                    <div className={styles.columns}>
                        <div className={styles.column}>
                            <h2 className={classNames('text', styles.title)}>
                                Выбранные заказы
                            </h2>
                            <div className={styles.orders}></div>
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
                        <div className={styles.column}>
                            <div className={stylesTable.overflow}>
                                <div
                                    className={classNames(
                                        stylesTable.table,
                                        'small-text',
                                        styles.table
                                    )}
                                    style={{ minWidth: '470px' }}
                                >
                                    <div
                                        className={classNames(
                                            'text',
                                            stylesTable.thead
                                        )}
                                        style={{
                                            gridTemplateColumns:
                                                '4% 32% 32% 32%',
                                        }}
                                    >
                                        <div className={stylesTable.th}>
                                            <input type="checkbox" />
                                        </div>
                                        <div className={stylesTable.th}>
                                            Наименование
                                        </div>
                                        <div className={stylesTable.th}>
                                            Количество
                                        </div>
                                        <div className={stylesTable.th}>
                                            Стоимость, ₽
                                        </div>
                                    </div>
                                    <div className={stylesTable.tbody}>
                                        <div
                                            className={classNames(
                                                stylesTable.tr,
                                                styles.active,
                                                styles.tableTr
                                            )}
                                            style={{
                                                gridTemplateColumns:
                                                    '4% 32% 32% 32%',
                                            }}
                                        >
                                            <div className={stylesTable.td}>
                                                <input
                                                    type="checkbox"
                                                    checked
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
                                            <div className={stylesTable.td}>
                                                <input
                                                    type="number"
                                                    name=""
                                                    className={
                                                        stylesInput.input
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.total}>
                                <p
                                    className={classNames(
                                        'text',
                                        styles.totalText
                                    )}
                                >
                                    Итоговая стоимость продуктов
                                </p>
                                <span
                                    className={classNames(
                                        'text',
                                        styles.totalPrice
                                    )}
                                >
                                    4260.80 ₽
                                </span>
                            </div>
                            <button
                                className={classNames(
                                    stylesBtn.btn,
                                    'small-text'
                                )}
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
