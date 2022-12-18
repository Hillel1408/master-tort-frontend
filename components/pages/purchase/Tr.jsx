import { useState } from 'react';
import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import styles from '../../../pages/purchase/Purchase.module.scss';
import stylesCheckbox from '../../CustomCheckbox/Checkbox.module.scss';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ product, index, orders }) {
    const [checkbox, setCheckbox] = useState(product.checked);

    const clickHandler = () => {
        const indexSplit = index.split('ch')[0];
        orders.map((order, orderIndex) => {
            order.total.map((item, totalIndex) => {
                if (item.id === indexSplit) {
                    orders[orderIndex].total[totalIndex].checked = !checkbox;
                }
            });
        });
        setCheckbox(!checkbox);
    };

    return (
        <div
            className={classNames(
                stylesTable.wrapper,
                styles.tableTr,
                checkbox && styles.active
            )}
        >
            <div className={stylesTable.td}>
                <label className={stylesCheckbox.customCheckbox}>
                    <input type="checkbox" checked={checkbox} />
                    <span onClick={(e) => clickHandler()}></span>
                </label>
            </div>
            <div
                onClick={() => clickHandler()}
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
