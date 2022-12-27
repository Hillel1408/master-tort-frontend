import classNames from 'classnames';
import { Modal } from '../Modal';
import styles from './Confirm.module.scss';
import stylesBtn from '../Btn/Btn.module.scss';

function Confirm({ modal, setModal, func }) {
    return (
        <Modal active={modal} setActive={setModal} closeIcon={true}>
            <p className={classNames('text', styles.modalText)}>
                Подтвердите действие
            </p>
            <div className={styles.modalButtons}>
                <button
                    className={classNames(stylesBtn.btn, 'small-text')}
                    onClick={() => {
                        setModal(false);
                        document.body.classList.remove('lock');
                    }}
                >
                    Отмена
                </button>
                <button
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    onClick={() => func()}
                >
                    Принять
                </button>
            </div>
        </Modal>
    );
}

export { Confirm };
