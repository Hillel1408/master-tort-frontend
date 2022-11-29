import classNames from 'classnames';
import styles from '../../../pages/calendar-orders/CalendarOrders.module.scss';

function Td({
    amount,
    st,
    count,
    activeDay,
    setActiveDay,
    today,
    isRushOrder,
}) {
    return st ? (
        <td>
            <div className={classNames(styles.st)}>{amount}</div>
        </td>
    ) : (
        <td
            onClick={() => count && setActiveDay(amount)}
            className={classNames(activeDay === amount && styles.tdActive)}
        >
            <div
                className={classNames(
                    styles.status,
                    count
                        ? isRushOrder
                            ? styles.statusUrgent
                            : styles.statusOrdinary
                        : '',
                    today && styles.today
                )}
            >
                {count && <div>{count}</div>}
                {amount}
            </div>
        </td>
    );
}

export { Td };
