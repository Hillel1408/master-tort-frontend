import classNames from 'classnames';

import { Td } from './Td';

import { getFirstWeekDay, getLastWeekDay } from './helpers';

import styles from '../../../pages/calendar-orders/CalendarOrders.module.scss';

const Table = ({
    nums,
    year,
    month,
    filteredOrders,
    day,
    activeDay,
    setActiveDay,
    isActive,
}) => (
    <table className={styles.table}>
        <thead className={styles.thead}>
            <tr className={classNames('small-text', styles.smallText)}>
                <th>пн</th>
                <th>вт</th>
                <th>ср</th>
                <th>чт</th>
                <th>пт</th>
                <th>сб</th>
                <th>вс</th>
            </tr>
        </thead>
        <tbody>
            {nums.map((item, indexTr) => (
                <tr key={indexTr}>
                    {item.map((amount, indexTd) => (
                        <Td
                            key={indexTd}
                            st={
                                (indexTr === 0 &&
                                    indexTd < getFirstWeekDay(year, month)) ||
                                (indexTr === nums.length - 1 &&
                                    indexTd >=
                                        item.length -
                                            (6 - getLastWeekDay(year, month)))
                                    ? true
                                    : false
                            }
                            amount={amount}
                            count={
                                filteredOrders[amount]?.length > 0 &&
                                filteredOrders[amount].length
                            }
                            isRushOrder={
                                filteredOrders[amount]?.length > 0 &&
                                filteredOrders[amount][0].isRushOrder
                            }
                            today={amount === day && isActive}
                            activeDay={activeDay}
                            setActiveDay={setActiveDay}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export { Table };
