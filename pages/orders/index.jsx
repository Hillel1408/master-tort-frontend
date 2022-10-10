import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import styles from './Orders.module.scss';

export default function Orders() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title={'Заказы'} />
                <main className="main">
                    <div class="orders__nav-wrapper">
                        <div class="orders__links text">
                            <a href="#" class="active">
                                Активные
                            </a>
                            <a href="#">Архив</a>
                        </div>
                        <div class="orders__tabs text">
                            <a href="#" class="active icon-16">
                                Доска заказов
                            </a>
                            <a href="#" class="icon-9">
                                Календарь
                            </a>
                        </div>
                    </div>
                    <div class="orders__kanban">
                        <div class="orders__kanban-column">
                            <span class="text orders__kanban-title">
                                Предстоящие
                            </span>
                            <div class="orders__kanban-orders">
                                <div class="orders__kanban-wrapper">
                                    <OrderCake />
                                </div>
                            </div>
                        </div>
                        <div class="orders__kanban-column">
                            <span class="text orders__kanban-title">
                                Закупка
                            </span>
                            <div class="orders__kanban-orders">
                                <div class="orders__kanban-wrapper">
                                    <OrderCake />
                                    <div class="add-block">
                                        <span class="small-text icon-8">
                                            Составить список продуктов для
                                            закупки
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="orders__kanban-column">
                            <span class="text orders__kanban-title">
                                В работе
                            </span>
                            <div class="orders__kanban-orders">
                                <div class="orders__kanban-wrapper">
                                    <OrderCake />
                                </div>
                            </div>
                        </div>
                        <div class="orders__kanban-column">
                            <span class="text orders__kanban-title">
                                Готово
                            </span>
                            <div class="orders__kanban-orders">
                                <div class="orders__kanban-wrapper">
                                    <OrderCake />
                                    <div class="add-block add-block__no-icon">
                                        <span class="small-text icon-8">
                                            Составить список продуктов для
                                            закупки
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
