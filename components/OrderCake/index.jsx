import classNames from 'classnames';
import styles from './OrderCake.module.scss';

function OrderCake() {
    return (
        <div class="order-cake orders__kanban-cake">
            <div class="order-cake__img">
                <img src="./img/sidebar/1.jpg" alt="" />
            </div>
            <div class="order-cake__content">
                <span class="order-cake__content-number">№123</span>
                <p class="order-cake__content-text small-text orders__kanban-text">
                    Торт “Красный бархат” на день рождения с белковым кремом
                </p>
                <div class="order-cake__content-block">
                    <span class="order-cake__content-date small-text icon-9">
                        22/09/2022
                    </span>
                    <span class="order-cake__content-time small-text">
                        9:00
                    </span>
                </div>
            </div>
        </div>
    );
}

export { OrderCake };
