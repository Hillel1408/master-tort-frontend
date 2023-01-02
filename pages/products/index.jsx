import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import uuid from 'react-uuid';
import Layout from '../../components/Layout';
import { Tr } from '../../components/pages/products/Tr';
import { Alert } from '../../components/Alert';
import { setAlert } from '../../redux/cakeSlice';
import { Modal } from '../../components/Modal';
import AuthService from '../../services/AuthService';
import ProductsService from '../../services/ProductsService';
import RecipeService from '../../services/RecipeService';
import styles from './Products.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Products() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [tr, setTr] = useState([]);
    const [recipe, setRecipe] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [start, setStart] = useState('');

    const dispatch = useDispatch();

    const trValue = {
        name: '',
        unit: { value: '', label: '' },
        package: '',
        price: '',
    };

    //опции выпадающего списка
    const measure = [
        { value: 'kg', label: 'кг.' },
        { value: 'gr', label: 'гр.' },
        { value: 'count', label: 'штук' },
        { value: 'liter', label: 'литр' },
    ];

    const thTitle = [
        'Наименование',
        'Единица измерения',
        'Упаковка',
        'Цена, ₽',
    ];

    const clickHandler = () => {
        const id = uuid();
        setTr([...tr, { ...trValue, id: id }]);
    };

    const saveSettings = async () => {
        //сохраняем продукты пользователя
        try {
            const response = await ProductsService.set({
                userId: dataUser.id,
                tr,
            });
            dispatch(
                setAlert({
                    text: 'Продукты успешно сохранены',
                    color: '#62ac62',
                })
            );
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
    };

    useEffect(() => {
        setStart(Math.floor(window.innerHeight / 45));

        const getRecipes = async (id) => {
            //получаем рецепты пользователя
            try {
                const response = await RecipeService.getRecipes(id);
                setRecipe(response.data);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const getSettings = async (user) => {
            //получаем табличные данные
            try {
                const response = await ProductsService.get(user);
                response.data && setTr(response.data.products);
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                getSettings(response.data.user.id);
                getRecipes(response.data.user.id);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            60
        )
            setStart((prevState) => prevState + 20);
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Продукты"
        >
            <Head>
                <title>Продукты</title>
            </Head>
            <div
                className={classNames(stylesTable.overflow, 'table')}
                style={{ overflow: 'auto' }}
            >
                <div
                    className={classNames(stylesTable.table, 'small-text')}
                    style={{
                        minWidth: '590px',
                    }}
                >
                    <div className={stylesTable.wrapperHead}>
                        <div
                            className={classNames('text', stylesTable.thead)}
                            style={{
                                gridTemplateColumns: '40% 20% 20% 20%',
                            }}
                        >
                            {thTitle.map((item) => (
                                <div key={item} className={stylesTable.th}>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div
                            className={stylesTable.th}
                            style={{ width: '22px' }}
                        ></div>
                    </div>
                    <div className={stylesTable.tbody}>
                        {tr.length > 0 &&
                            tr
                                .slice(0, start)
                                .map((item, index) => (
                                    <Tr
                                        key={item.id}
                                        item={item}
                                        tr={tr}
                                        index={index}
                                        setTr={setTr}
                                        measure={measure}
                                        recipe={recipe}
                                        setActive={setModalActive}
                                    />
                                ))}
                        {start >= tr.length && (
                            <div className="addBlock">
                                <span
                                    onClick={() => clickHandler()}
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
                                >
                                    Добавить продукт
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {start >= tr.length && (
                <div className={stylesTable.buttons}>
                    <div></div>
                    <button
                        className={classNames(
                            stylesBtn.btn,
                            stylesBtn.btn__secondary,
                            'small-text'
                        )}
                        href="#"
                        onClick={() => saveSettings()}
                    >
                        Сохранить
                    </button>
                </div>
            )}
            <Modal
                active={modalActive}
                setActive={setModalActive}
                closeIcon={true}
            >
                <span className="icon-16"></span>
                <p className={classNames('text', styles.modalText)}>
                    Нельзя удалить продукт, который используется в рецептах
                </p>
                <button
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    style={{ marginTop: '14px' }}
                    onClick={() => {
                        setModalActive(false);
                        document.body.classList.remove('lock');
                    }}
                >
                    Понятно
                </button>
            </Modal>
            <Alert />
        </Layout>
    );
}
