import classNames from 'classnames';
import styles from './Modal.module.scss';

function Modal({ active, setActive, children }) {
    return (
        <div
            className={
                active
                    ? classNames(styles.popup, styles.popupOpen)
                    : styles.popup
            }
            onClick={() => setActive(false)}
        >
            <div className={styles.popup__body}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        active
                            ? classNames(
                                  styles.popup__content,
                                  styles.popup__contentOpen
                              )
                            : styles.popup__content
                    }
                >
                    <span
                        className={styles.popup__close}
                        onClick={() => setActive(false)}
                    ></span>
                    {children}
                </div>
            </div>
        </div>
    );
}

export { Modal };
