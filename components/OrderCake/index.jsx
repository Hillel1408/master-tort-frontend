import classNames from 'classnames';
import styles from './OrderCake.module.scss';
import stylesOrders from '../../pages/orders/Orders.module.scss';

function OrderCake({
    type,
    style,
    name,
    number,
    date,
    image,
    draggable,
    dragOverHandler,
    dragLeaveHandler,
    dragStartHandler,
    dragEndHandler,
    dropHandler,
    item,
    board,
}) {
    const dateSplit = date.split('T');

    return (
        <div
            className={classNames(
                styles.root,
                styles[type],
                stylesOrders[style],
                'item'
            )}
            draggable={draggable}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
        >
            <div className={styles.img}>
                <img src={image} alt="" draggable="false" />
            </div>
            <div className={styles.content}>
                <span className={styles.contentNumber}>№{number}</span>
                <p className={classNames(styles.contentText, 'small-text')}>
                    {name}
                </p>
                <div className={styles.contentBlock}>
                    <span
                        className={classNames(
                            styles.contentDate,
                            'icon-9',
                            'small-text'
                        )}
                    >
                        {dateSplit[0]}
                    </span>
                    <span
                        className={classNames(styles.contentTime, 'small-text')}
                    >
                        {dateSplit[1].substr(0, 5)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export { OrderCake };
