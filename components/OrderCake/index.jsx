import classNames from 'classnames';
import styles from './OrderCake.module.scss';
import stylesOrders from '../../pages/orders/Orders.module.scss';

function OrderCake({
    bg,
    item,
    type,
    board,
    style,
    draggable,
    dropHandler,
    dragEndHandler,
    dragOverHandler,
    dragStartHandler,
    dragLeaveHandler,
}) {
    return (
        <div
            className={classNames(
                styles.root,
                styles[type],
                stylesOrders[style],
                'item'
            )}
            style={{ backgroundColor: { bg } }}
            draggable={draggable}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
        >
            <div className={styles.img}>
                <img src={item.imagesUrl[0]} alt="" draggable="false" />
            </div>
            <div className={styles.content}>
                <span className={styles.contentNumber}>№{item.number}</span>
                <p className={classNames(styles.contentText, 'small-text')}>
                    {item.orderName}
                </p>
                <div className={styles.contentBlock}>
                    <span
                        className={classNames(
                            styles.contentDate,
                            'icon-9',
                            'small-text'
                        )}
                    >
                        {item.date}
                    </span>
                    <span
                        className={classNames(styles.contentTime, 'small-text')}
                    >
                        {item.time}
                    </span>
                </div>
            </div>
        </div>
    );
}

export { OrderCake };
