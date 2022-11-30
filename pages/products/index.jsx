import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import { Tr } from '../../components/pages/products/Tr';
import { Alert } from '../../components/Alert';
import { setAlert } from '../../redux/cakeSlice';
import AuthService from '../../services/AuthService';
import ProductsService from '../../services/ProductsService';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Products() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [tr, setTr] = useState([]);

    const dispatch = useDispatch();

    const trValue = {
        id: Math.random(),
        name: '',
        unit: { value: '', label: '' },
        packageKg: '',
        packageGr: '',
        price: '',
    };

    //опции выпадающего списка
    const measure = [
        { value: 'kg', label: 'кг.' },
        { value: 'gr', label: 'гр.' },
        { value: 'count', label: 'штук' },
    ];

    const thTitle = [
        'Наименование',
        'Единица измерения',
        'Упаковка кг.',
        'Упаковка гр.',
        'Цена, ₽',
    ];

    const clickHandler = () => {
        setTr([...tr, trValue]);
    };

    const saveSettings = async () => {
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
        const getSettings = async (user) => {
            //получаем табличные данные
            try {
                const response = await ProductsService.get(user);
                setTr(response.data.products);
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
            title="Продукты"
        >
            <div className={classNames(stylesTable.overflow, 'table')}>
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
                                gridTemplateColumns: '40% 15% 15% 15% 15%',
                            }}
                        >
                            {thTitle.map((item) => (
                                <div className={stylesTable.th}>{item}</div>
                            ))}
                        </div>
                        <div
                            className={stylesTable.th}
                            style={{ width: '22px' }}
                        ></div>
                    </div>
                    <div className={stylesTable.tbody}>
                        {tr.length > 0 &&
                            tr.map((item, index) => (
                                <Tr
                                    item={item}
                                    tr={tr}
                                    index={index}
                                    setTr={setTr}
                                    measure={measure}
                                />
                            ))}
                        <div className="addBlock">
                            <span
                                onClick={() => clickHandler()}
                                className={classNames('small-text', 'icon-8')}
                            >
                                Добавить продукт
                            </span>
                        </div>
                    </div>
                </div>
            </div>
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
            <Alert />
        </Layout>
    );
}
