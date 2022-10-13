import classNames from 'classnames';
import styles from './OrderCake.module.scss';
import stylesOrders from '../../pages/orders/Orders.module.scss';

function OrderCake({ type, style }) {
    return (
        <div
            className={classNames(
                styles.root,
                styles[type],
                stylesOrders[style]
            )}
        >
            <div className={styles.img}>
                <img src="1.jpg" alt="" />
            </div>
            <div className={styles.content}>
                <span className={styles.contentNumber}>№123</span>
                <p className={classNames(styles.contentText, 'small-text')}>
                    Торт “Красный бархат” на день рождения с белковым кремом
                </p>
                <div className={styles.contentBlock}>
                    <span
                        className={classNames(
                            styles.contentDate,
                            'icon-9',
                            'small-text'
                        )}
                    >
                        22/09/2022
                    </span>
                    <span
                        className={classNames(styles.contentTime, 'small-text')}
                    >
                        9:00
                    </span>
                </div>
            </div>
        </div>
    );
}

export { OrderCake };
