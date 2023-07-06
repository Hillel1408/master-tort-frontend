import classNames from 'classnames';
import dateFormat from 'dateformat';

import styles from './OrderCake.module.scss';

function Content({ item }) {
    return (
        <>
            <span className={classNames(styles.contentNumber, 'icon-27')}>
                №{item.number}
            </span>
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
                    {dateFormat(item.date, 'mm/dd/yyyy')}
                </span>
                <span className={classNames(styles.contentTime, 'small-text')}>
                    {dateFormat(item.time, 'HH:MM')}
                </span>
            </div>
        </>
    );
}

export { Content };
