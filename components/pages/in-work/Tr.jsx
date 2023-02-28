import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Checkbox } from '../../CustomCheckbox';
import styles from '../../../pages/purchase/Purchase.module.scss';

function Tr({
    orders,
    cake,
    rings,
    checked,
    sumProducts,
    setSumProducts,
    keyObj,
}) {
    const router = useRouter();

    const clickHandler = () => {
        const indexSplit = keyObj.split('ch')[0];
        orders.map((order, orderIndex) => {
            order.table.map((item, tableIndex) => {
                if (item.recipe.value === indexSplit) {
                    orders[orderIndex].table[tableIndex].checked = !checked;
                }
            });
        });
        sumProducts[keyObj].checked = !checked;
        setSumProducts({ ...sumProducts });
    };

    const func = () => {
        if (keyObj.indexOf('ch') === -1) {
            router.push(`/recipe/${keyObj}?flag=true`);
        } else
            router.push(`/recipe/${keyObj.split('ch')[0]}?flag=true&ch=true`);
    };

    return (
        <div className={styles.workGridItem}>
            <Checkbox checkbox={checked} clickHandler={clickHandler} />
            <div>
                <p
                    className={classNames('small-text', styles.work)}
                    style={{
                        marginBottom: '5px',
                    }}
                >
                    {cake}
                </p>
                <p
                    className={classNames(
                        'small-text',
                        styles.work,
                        styles.workFlex
                    )}
                >
                    {rings.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </p>
                <span
                    className={classNames(
                        'icon-28',
                        'small-text',
                        styles.workLink
                    )}
                    onClick={() => func()}
                >
                    Смотреть рецепт
                </span>
            </div>
        </div>
    );
}

export { Tr };
