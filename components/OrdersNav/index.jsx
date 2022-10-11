import classNames from 'classnames';
import styles from './OrdersNav.module.scss';

function OrdersNav({ visibleTabs }) {
    return (
        <div className={styles.orders__navWrapper}>
            <div className={classNames('text', styles.orders__links)}>
                <a href="#" className="active">
                    Активные
                </a>
                <a href="#">Архив</a>
            </div>
            {visibleTabs && (
                <div className={classNames('text', styles.orders__tabs)}>
                    <a href="#" className={classNames('active', 'icon-16')}>
                        Доска заказов
                    </a>
                    <a href="#" className="icon-9">
                        Календарь
                    </a>
                </div>
            )}
        </div>
    );
}

export { OrdersNav };
