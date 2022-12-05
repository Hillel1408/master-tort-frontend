import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Layout from '../components/Layout';
import { TabContent } from '../components/pages/index/TabContent';
import AuthService from '../services/AuthService';
import OrdersService from '../services/OrdersService';
import styles from './Home.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [active, setActive] = useState(0);

    const [items, setItems] = useState([]);
    const [isEdit, setIsEdit] = useState();

    const openTab = (e) => setActive(+e.target.dataset.index);

    useEffect(() => {
        const getOrder = async (userId) => {
            //получаем заказ пользователя
            try {
                const id = window.location.search.split('?id=')[1];
                if (id) {
                    const response = await OrdersService.getOrder(id);
                    setIsEdit(true);
                    setItems([...items, response.data]);
                } else {
                    {
                        setIsEdit(false);
                        setItems([
                            ...items,
                            {
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
                            },
                        ]);
                    }
                }
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                getOrder();
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
            title="Расчет тортов"
        >
            <div className={styles.tab}>
                {items.map((n, i) => (
                    <div
                        className={classNames(
                            'text',
                            styles.tabItem,
                            i === active ? styles.tabActive : ''
                        )}
                        onClick={openTab}
                        data-index={i}
                    >
                        Вариант {i + 1}
                    </div>
                ))}
                <span
                    className="icon-8"
                    onClick={() => {
                        let clone = JSON.parse(JSON.stringify(items[active]));
                        setItems([...items, clone]);
                    }}
                ></span>
            </div>
            {items.map((n, i) =>
                i === active ? (
                    <TabContent
                        key={i}
                        items={items}
                        index={i}
                        isEdit={isEdit}
                        userId={dataUser.id}
                        style={{ display: 'flex' }}
                    />
                ) : (
                    <TabContent
                        key={i}
                        items={items}
                        index={i}
                        isEdit={isEdit}
                        userId={dataUser.id}
                        style={{ display: 'none' }}
                    />
                )
            )}
        </Layout>
    );
}
