import classNames from 'classnames';

import {
    getNextYear,
    getNextMonth,
    getPrevYear,
    getPrevMonth,
} from './helpers';

import styles from './CalendarOrders.module.scss';

function Header({ dateNow, month, setYear, year, setMonth, setActiveDay }) {
    const nextClickHandler = () => {
        const month2 = getNextMonth(month);

        setYear(getNextYear(year, month));
        setMonth(month2);
        setActiveDay('');
    };

    const prevClickHandler = () => {
        setYear(getPrevYear(year, month));
        setMonth(getPrevMonth(month));
        setActiveDay('');
    };

    return (
        <div className={styles.header}>
            <span className={classNames('text', styles.title)}>{dateNow}</span>
            <div className={styles.nav}>
                <span
                    className={classNames('icon-29', styles.prev)}
                    onClick={() => prevClickHandler()}
                ></span>
                <span
                    className={classNames('icon-30', styles.next)}
                    onClick={() => nextClickHandler()}
                ></span>
            </div>
        </div>
    );
}

export { Header };
