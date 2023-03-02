import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import { Checkbox } from '../../CustomCheckbox';
import styles from '../../../pages/purchase/Purchase.module.scss';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ product, index, orders, sumProducts, setSumProducts }) {
    const clickHandler = () => {
        const indexSplit = index.split('ch')[0];
        orders.map((order, orderIndex) => {
            order.total.map((item, totalIndex) => {
                if (item.id === indexSplit && product.key.includes(item.key)) {
                    orders[orderIndex].total[totalIndex].checked =
                        !product.checked;
                }
            });
        });
        product.checked = !product.checked;
        setSumProducts([...sumProducts]);
    };

    return (
        <div
            className={classNames(
                stylesTable.wrapper,
                styles.tableTr,
                product.checked && styles.active
            )}
        >
            <div className={stylesTable.td}>
                <Checkbox
                    checkbox={product.checked}
                    clickHandler={clickHandler}
                />
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
