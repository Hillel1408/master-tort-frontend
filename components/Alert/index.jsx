import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { resetAlert } from '../../redux/cakeSlice';
import styles from './Alert.module.scss';

function Alert() {
    const { alertName, alertColor } = useSelector((state) => state.cakes);
    const dispatch = useDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(resetAlert(''));
        }, 1500);
        return () => {
            clearInterval(timerId);
        };
        // eslint-disable-next-line
    }, [alertName]);

    return (
        alertName && (
            <div
                className={classNames(
                    styles.toastContainer,
                    alertName !== '' && styles.active
                )}
                style={{ backgroundColor: `${alertColor}` }}
            >
                {alertName}
            </div>
        )
    );
}

export { Alert };
