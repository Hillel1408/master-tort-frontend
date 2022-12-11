import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Tab } from '../components/pages/index/Tab';
import { TabContent } from '../components/pages/index/TabContent';
import AuthService from '../services/AuthService';
import OrdersService from '../services/OrdersService';
import RecipeService from '../services/RecipeService';
import stylesNoAccess from '../components/NoAccess/NoAccess.module.scss';
import styles from './Home.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [active, setActive] = useState(0);
    const [items, setItems] = useState([]);
    const [select, setSelect] = useState('');

    const router = useRouter();

    const value = {
        orderName: '',
        date: '',
        time: '',
        info: '',
        range: '',
        standWidth: '',
        standLength: '',
        price: '',
        cakeShape: '',
        kindCake: '',
        imagesUrl: [],
        table: [],
    };

    useEffect(() => {
        const getRecipes = async (id) => {
            //получаем рецепты пользователя
            try {
                const response = await RecipeService.getRecipes(id);
                //формируем значения выпадающего списка с рецептами
                const select = [];
                response.data.map((item) => {
                    item.checkbox &&
                        select.push({
                            value: item._id,
                            label: item.recipeName,
                        });
                });
                setSelect(select);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const getOrder = async () => {
            //получаем заказ пользователя
            try {
                const id = window.location.pathname.split('/')[1];
                const response = await OrdersService.getOrder(id);
                setItems([response.data]);
            } catch (e) {
                console.log(e.response?.data?.message);
            } finally {
                setIsAuth(true);
            }
        };

        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                getOrder();
                getRecipes(response.data.user.id);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title={items[0] ? items[0].orderName : ''}
        >
            {items[0] ? (
                <>
                    <div className={styles.tab}>
                        <Tab setActive={setActive} i={0} active={active} />
                        <div
                            className={classNames(
                                'icon-28',
                                'small-text',
                                styles.backLink
                            )}
                            onClick={() => router.back()}
                        >
                            <span>Вернуться к заказам</span>
                        </div>
                    </div>
                    <TabContent
                        key={0}
                        items={items}
                        index={0}
                        isEdit={true}
                        userId={dataUser.id}
                        setItems={setItems}
                        select={select}
                        value={value}
                        style={{ display: 'flex' }}
                    />
                </>
            ) : (
                <h2
                    className={classNames(
                        'title',
                        stylesNoAccess.noOrders,
                        stylesNoAccess.title
                    )}
                >
                    Ошибка загрузки данных
                </h2>
            )}
        </Layout>
    );
}
