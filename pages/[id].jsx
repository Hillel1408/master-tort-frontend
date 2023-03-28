import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Tab } from '../components/pages/index/Tab';
import { TabContent } from '../components/pages/index/TabContent';
import OrdersService from '../services/OrdersService';
import RecipeService from '../services/RecipeService';
import ProductsService from '../services/ProductsService';
import styles from './Home.module.scss';
import stylesNoAccess from '../components/NoAccess/NoAccess.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [active, setActive] = useState(0);
    const [items, setItems] = useState([]);
    const [select, setSelect] = useState('');
    const [select2, setSelect2] = useState('');
    const [products, setProducts] = useState([]);
    const [recipe, setRecipe] = useState('');

    const router = useRouter();

    const { dataUser_2 } = useSelector((state) => state.cakes);

    const value = {
        orderName: '',
        date: '',
        time: '',
        info: '',
        range: 125,
        standWidth: '',
        standLength: '',
        price: '',
        cakeShape: '',
        kindCake: '',
        imagesUrl: [],
        table: [],
        total: [],
        cream: '',
    };

    useEffect(() => {
        const getRecipes = async (id) => {
            //получаем рецепты пользователя
            try {
                const response = await RecipeService.getRecipes(id);
                //формируем значения выпадающего списка с рецептами и кремами
                const select = [];
                const select2 = [];
                response.data.map((item) => {
                    if (item.checkbox) {
                        if (item.isCream) {
                            select2.push({
                                value: item._id,
                                label: item.recipeName,
                            });
                        } else
                            select.push({
                                value: item._id,
                                label: item.recipeName,
                            });
                    }
                });
                setSelect(select);
                setSelect2(select2);
                setRecipe(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const getProducts = async (user) => {
            //получаем продукты пользователя
            const response = await ProductsService.get(user);
            response.data && setProducts(response.data.products);
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

        const checkAuth = () => {
            setDataUser(dataUser_2);
            getOrder();
            getRecipes(dataUser_2.id);
            getProducts(dataUser_2.id);
        };
        if (dataUser_2) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title={items[0] ? items[0].orderName : ''}
        >
            <Head>
                <title>Расчет тортов</title>
            </Head>
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
                        >
                            <span onClick={() => router.back()}>Назад</span>
                        </div>
                    </div>
                    <TabContent
                        items={items}
                        index={0}
                        isEdit={true}
                        userId={dataUser.id}
                        setItems={setItems}
                        select={select}
                        select2={select2}
                        value={value}
                        products={products}
                        recipe={recipe}
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
