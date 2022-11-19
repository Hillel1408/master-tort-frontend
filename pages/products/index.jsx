import classNames from 'classnames';
import stylesTable from '../../components/Table/Table.module.scss';
import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { Tr } from '../../components/pages/products/Tr';
import Layout from '../../components/Layout';

export default function Products() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [tr, setTr] = useState([]);

    const trValue = {
        name: '',
        measure: [
            { value: 'kg', label: 'кг.' },
            { value: 'gr', label: 'гр.' },
            { value: 'count', label: 'штук' },
        ],
        packageKg: '',
        packageGr: '',
        price: '',
    };

    useEffect(() => {
        setTr([...tr, trValue]);
    }, []);

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

    useEffect(() => {
        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setIsAuth(true);
                setDataUser(response.data.user);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout isAuth={isAuth} setIsAuth={setIsAuth} dataUser={dataUser}>
            <div className={stylesTable.overflow}>
                <div
                    className={classNames(stylesTable.table, 'small-text')}
                    style={{
                        minWidth: '545px',
                    }}
                >
                    <div className={stylesTable.wrapperHead}>
                        <div
                            className={classNames('text', stylesTable.thead)}
                            style={{
                                gridTemplateColumns: '20% 20% 20% 20% 20%',
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
                                <Tr item={item} tr={tr} index={index} />
                            ))}
                    </div>
                </div>
            </div>
            <div className="addBlock">
                <span
                    onClick={() => clickHandler()}
                    className={classNames('small-text', 'icon-8')}
                >
                    Добавить продукт
                </span>
            </div>
        </Layout>
    );
}
