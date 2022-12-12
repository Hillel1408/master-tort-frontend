import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import styles from '../../../pages/purchase/Purchase.module.scss';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ product }) {
    return (
        <div className={classNames(stylesTable.wrapper, styles.tableTr)}>
            <div className={stylesTable.td}>
                <input type="checkbox" />
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
