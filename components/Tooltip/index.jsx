import classNames from 'classnames';
import styles from './Tooltip.module.scss';

function Tooltip({ children, visiblePopup, style, setVisiblePopup, close }) {
    return (
        <div
            id={style}
            className={classNames(
                styles.tooltiptext,
                visiblePopup && styles.tooltipActive
            )}
        >
            {close && (
                <i
                    className="icon-11"
                    onClick={() => setVisiblePopup(false)}
                ></i>
            )}
            {children}
        </div>
    );
}

export { Tooltip };
