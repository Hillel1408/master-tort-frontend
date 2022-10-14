import styles from './CalendarOrders.module.scss';
import classNames from 'classnames';

function Td({ amount, st }) {
    return (
        <td>
            <div
                className={classNames(
                    st == true ? styles.st : '',
                    styles.status
                )}
            >
                {amount}
            </div>
        </td>
    );
}

export { Td };
