import classNames from 'classnames';
import styles from './OrderCake.module.scss';
import stylesOrders from '../../pages/orders/Orders.module.scss';

function OrderCake({ type, style }) {
    return (
        <div
            className={classNames(
                styles.orderCake,
                styles[type],
                stylesOrders[style]
            )}
        >
            <div className={styles.orderCake__img}>
                <img src="1.jpg" alt="" />
            </div>
            <div className={styles.orderCake__content}>
                <span className={styles.orderCake__contentNumber}>№123</span>
                <p
                    className={classNames(
                        styles.orderCake__contentText,
                        styles.orders__kanbanText,
                        'small-text'
                    )}
                >
                    Торт “Красный бархат” на день рождения с белковым кремом
                </p>
                <div className={styles.orderCake__contentBlock}>
                    <span
                        className={classNames(
                            styles.orderCake__contentDate,
                            'icon-9',
                            'small-text'
                        )}
                    >
                        22/09/2022
                    </span>
                    <span
                        className={classNames(
                            styles.orderCake__contentTime,
                            'small-text'
                        )}
                    >
                        9:00
                    </span>
                </div>
            </div>
        </div>
    );
}

export { OrderCake };
