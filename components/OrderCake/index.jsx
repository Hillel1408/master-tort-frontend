import classNames from 'classnames';
import styles from './OrderCake.module.scss';
import stylesOrders from '../../pages/orders/Orders.module.scss';
import Link from 'next/link';

function OrderCake({
    dropHandler,
    style,
    bg,
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    board,
    dragStartHandler,
    draggable,
    item,
    type,
}) {
    return (
        <Link
            href={{
                pathname: `/`,
                query: { id: item._id },
            }}
            className={classNames(
                styles.root,
                styles[type],
                stylesOrders[style],
                'item'
            )}
            style={{ backgroundColor: `${bg}` }}
            draggable={draggable}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
        >
            <div className={styles.img}>
                <img
                    src={`http://localhost:5000${item.imagesUrl[0]}`}
                    alt=""
                    draggable="false"
                />
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
        </Link>
    );
}

export { OrderCake };
