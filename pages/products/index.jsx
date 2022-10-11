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
                    <div className={stylesTable.table__overflow}>
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
                                    stylesTable.tableThead
                                )}
                                style={{
                                    gridTemplateColumns:
                                        '32% 16% 16% 16% 16% 4%',
                                }}
                            >
                                <div className={stylesTable.tableTh}>
                                    Наименование
                                </div>
                                <div className={stylesTable.tableTh}>
                                    Единица измерения
                                </div>
                                <div className={stylesTable.tableTh}>
                                    Упаковка lb
                                </div>
                                <div className={stylesTable.tableTh}>
                                    Упаковка oz
                                </div>
                                <div className={stylesTable.tableTh}>
                                    Цена, ₽
                                </div>
                                <div className={stylesTable.tableTh}></div>
                            </div>
                            <div className={stylesTable.tableTbody}>
                                <div
                                    className={stylesTable.tableTr}
                                    style={{
                                        gridTemplateColumns:
                                            '32% 16% 16% 16% 16% 4%',
                                    }}
                                >
                                    <div className={stylesTable.tableTd}>
                                        <input
                                            type="text"
                                            name=""
                                            className="input"
                                        />
                                    </div>
                                    <div className={stylesTable.tableTd}>
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
                                    <div className={stylesTable.tableTd}>
                                        <input
                                            type="number"
                                            name=""
                                            className="input"
                                        />
                                    </div>
                                    <div className={stylesTable.tableTd}>
                                        <input
                                            type="number"
                                            name=""
                                            className="input"
                                        />
                                    </div>
                                    <div className={stylesTable.tableTd}>
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
