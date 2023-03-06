import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Tab } from '../components/pages/index/Tab';
import { TabContent } from '../components/pages/index/TabContent';
import RecipeService from '../services/RecipeService';
import ProductsService from '../services/ProductsService';
import styles from './Home.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [active, setActive] = useState(0);
    const [products, setProducts] = useState([]);
    const [recipe, setRecipe] = useState('');

    const { dataUser_2 } = useSelector((state) => state.cakes);

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
        calculation: [],
        total: [],
        cream: '',
    };

    const [items, setItems] = useState([value]);
    const [select, setSelect] = useState('');
    const [select2, setSelect2] = useState('');

    useEffect(() => {
        //получаем продукты
        const getProducts = async (user) => {
            const response = await ProductsService.get(user);
            response.data && setProducts(response.data.products);
        };

        const getRecipes = async (id) => {
            //получаем рецепты пользователя
            try {
                const response = await RecipeService.getRecipes(id);
                //формируем значения выпадающего списка с рецептами
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
                setRecipe(response.data);
                setSelect(select);
                setSelect2(select2);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = () => {
            setDataUser(dataUser_2);
            getRecipes(dataUser_2.id);
            getProducts(dataUser_2.id);
            setIsAuth(true);
        };
        if (dataUser_2) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Расчет тортов"
        >
            <Head>
                <title>Расчет тортов</title>
            </Head>
            <div className={styles.tab}>
                {items.map((n, i) => (
                    <Tab key={i} setActive={setActive} i={i} active={active} />
                ))}
                {items.length < 3 && (
                    <span
                        className="icon-8"
                        onClick={() => {
                            let clone = JSON.parse(
                                JSON.stringify(items[active])
                            );
                            setItems([...items, clone]);
                        }}
                    ></span>
                )}
            </div>
            {items.map((n, i) => (
                <TabContent
                    key={i}
                    items={items}
                    index={i}
                    isEdit={false}
                    userId={dataUser.id}
                    setItems={setItems}
                    select={select}
                    select2={select2}
                    value={value}
                    products={products}
                    recipe={recipe}
                    style={
                        i === active ? { display: 'flex' } : { display: 'none' }
                    }
                />
            ))}
        </Layout>
    );
}
