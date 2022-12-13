import { useState } from 'react';
import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import styles from '../../../pages/purchase/Purchase.module.scss';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ product, index, orders }) {
    const [checkbox, setCheckbox] = useState(product.checked);

    return (
        <div
            className={classNames(
                stylesTable.wrapper,
                styles.tableTr,
                checkbox && styles.active
            )}
            onClick={() => {
                setCheckbox(!checkbox);
                orders.map((order, orderIndex) => {
                    order.total.map((item, totalIndex) => {
                        if (item.id === index.split('ch')[0]) {
                            orders[orderIndex].total[totalIndex].checked =
                                !checkbox;
                        }
                    });
                });
            }}
        >
            <div className={stylesTable.td}>
                <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                />
            </div>
            <div
                className={stylesTable.tr}
                style={{
                    gridTemplateColumns: '33.3% 33.3% 33.3%',
                }}
            >
                <TableCell
                    value={product.name}
                    disabled={true}
                    purchase={true}
                />
                <TableCell
                    value={product.count.toFixed(2)}
                    disabled={true}
                    purchase={true}
                />
                {product.price !== '0' && product.price !== '' ? (
                    <TableCell
                        value={product.price.toFixed(2)}
                        disabled={true}
                        purchase={true}
                    />
                ) : (
                    <TableCell disabled={true} purchase={true} />
                )}
            </div>
        </div>
    );
}

export { Tr };
