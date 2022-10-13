import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import stylesTable from '../../components/Table/Table.module.scss';

export default function Products() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Продукты" />
                <main className="main">
                    <div className={stylesTable.overflow}>
                        <div
                            className={classNames(
                                stylesTable.table,
                                'small-text'
                            )}
                            style={{ minWidth: '545px' }}
                        >
                            <div
                                className={classNames(
                                    'text',
                                    stylesTable.thead
                                )}
                                style={{
                                    gridTemplateColumns:
                                        '32% 16% 16% 16% 16% 4%',
                                }}
                            >
                                <div className={stylesTable.th}>
                                    Наименование
                                </div>
                                <div className={stylesTable.th}>
                                    Единица измерения
                                </div>
                                <div className={stylesTable.th}>
                                    Упаковка lb
                                </div>
                                <div className={stylesTable.th}>
                                    Упаковка oz
                                </div>
                                <div className={stylesTable.th}>Цена, ₽</div>
                                <div className={stylesTable.th}></div>
                            </div>
                            <div className={stylesTable.tbody}>
                                <div
                                    className={stylesTable.tr}
                                    style={{
                                        gridTemplateColumns:
                                            '32% 16% 16% 16% 16% 4%',
                                    }}
                                >
                                    <div className={stylesTable.td}>
                                        <input
                                            type="text"
                                            name=""
                                            className="input"
                                        />
                                    </div>
                                    <div className={stylesTable.td}>
                                        <select
                                            className={classNames(
                                                'input',
                                                'select'
                                            )}
                                        >
                                            <option></option>
                                            <option>кг</option>
                                            <option>штук</option>
                                            <option>гр</option>
                                        </select>
                                    </div>
                                    <div className={stylesTable.td}>
                                        <input
                                            type="number"
                                            name=""
                                            className="input"
                                        />
                                    </div>
                                    <div className={stylesTable.td}>
                                        <input
                                            type="number"
                                            name=""
                                            className="input"
                                        />
                                    </div>
                                    <div className={stylesTable.td}>
                                        <input
                                            type="number"
                                            name=""
                                            className="input"
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
                        </div>
                    </div>
                    <div className="addBlock">
                        <span className={classNames('small-text', 'icon-8')}>
                            Добавить продукт
                        </span>
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
