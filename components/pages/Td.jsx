import classNames from 'classnames';
import styles from '../../pages/calendar-orders/CalendarOrders.module.scss';

function Td({ amount, st, count, activeDay, setActiveDay, today }) {
    return (
        <td
            onClick={() => count && setActiveDay(amount)}
            className={classNames(activeDay == amount && styles.tdActive)}
        >
            <div
                className={classNames(
                    st && styles.st,
                    styles.status,
                    count && styles.statusOrdinary,
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
