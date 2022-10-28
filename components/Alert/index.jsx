import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../redux/cakeSlice';

function Alert() {
    const alertName = useSelector((state) => state.cakes.alertName);
    const dispatch = useDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(resetAlert(''));
        }, 2000);

        return () => {
            clearInterval(timerId);
        };
        // eslint-disable-next-line
    }, [alertName]);

    return (
        alertName && (
            <div
                id="toast-container"
                className={alertName !== '' ? 'active' : ''}
            >
                {alertName}
            </div>
        )
    );
}

export { Alert };
