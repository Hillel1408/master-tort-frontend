import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Tab } from '../components/pages/index/Tab';
import { TabContent } from '../components/pages/index/TabContent';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import styles from './Home.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [active, setActive] = useState(0);

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

    const [items, setItems] = useState([value]);
    const [select, setSelect] = useState('');

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

        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                getRecipes(response.data.user.id);
                setIsAuth(true);
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
                    value={value}
                    style={
                        i === active ? { display: 'flex' } : { display: 'none' }
                    }
                />
            ))}
        </Layout>
    );
}
