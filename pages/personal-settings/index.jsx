import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import { CustomSelect } from '../../components/CustomSelect';
import { Tooltip } from '../../components/Tooltip';
import AuthService from '../../services/AuthService';
import { IMAGE_URL } from '../../http';
import UploadService from '../../services/UploadService';
import styles from './PersonalSettings.module.scss';
import stylesTooltip from '../../components/Tooltip/Tooltip.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function PersonalSettings() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [image, setImage] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [errorPas, setErrorPas] = useState('');
    const [success, setSuccess] = useState('');
    const [successPas, setSuccessPas] = useState('');

    const inputFileRef = useRef('');
    const btnRef = useRef();

    //опции выпадающего списка
    const measure = [
        { value: '1', label: '1 день' },
        { value: '2', label: '2 дня' },
        { value: '3', label: '3 дня' },
        { value: '4', label: '4 дня' },
        { value: '5', label: '5 дней' },
    ];

    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm({
        defaultValues: {
            password: '',
            newPassword: '',
            repeatPassword: '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        //если какое-то поле из формы не заполнено, делаем кнопку не активной
        if (btnRef.current) {
            (email !== '' && fullName !== '' && email !== dataUser.email) ||
            fullName !== dataUser.fullName ||
            image
                ? (btnRef.current.disabled = false)
                : (btnRef.current.disabled = true);
        }
    }, [fullName, email, image]);

    const resetState = (state) => {
        setTimeout(() => {
            state('');
        }, 3000);
    };

    const onSubmit = async () => {
        //отправляем основную информацию на сервер
        try {
            const response = await AuthService.update({
                userId: dataUser.id,
                fullName,
                email,
                image: image && `${IMAGE_URL}${image}`,
            });
            setDataUser(response.data);
            response.data.email !== email
                ? setSuccess(
                      'На вашу новую почту выслана ссылка для ее подтверждения'
                  )
                : setSuccess('Настройки успешно сохранены');
            resetState(setSuccess);
        } catch (e) {
            e.response?.data[0]
                ? setError(e.response?.data[0]?.msg)
                : setError(e.response?.data?.message);
            resetState(setError);
        }
    };

    const onSubmitSelect = async (e) => {
        //отправляем срочный заказ на сервер
        try {
            const response = await AuthService.updateRushOrder({
                userId: dataUser.id,
                rushOrder: e,
            });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const onSubmitPassword = async (values) => {
        //отправляем новый пароль на сервер
        try {
            if (values.newPassword !== values.repeatPassword) {
                setErrorPas('Пароли не совпадают');
                resetState(setErrorPas);
            } else if (values.newPassword !== values.password) {
                const response = await AuthService.updatePassword({
                    userId: dataUser.id,
                    ...values,
                });
                setSuccessPas('Пароль успешно изменен');
                resetState(setSuccessPas);
                reset();
            } else {
                setErrorPas('Пароль должен отличаться от текущего');
                resetState(setErrorPas);
            }
        } catch (e) {
            e.response?.data[0]
                ? setErrorPas(e.response?.data[0]?.msg)
                : setErrorPas(e.response?.data?.message);
            resetState(setErrorPas);
        }
    };

    const sendImage = async (file) => {
        //отправляем аватар на сервер
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await UploadService.set(formData);
            setImage(response.data.url);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const handleChangeFile = async (e) => {
        //получаем картинку рецепта
        const file = e.target.files[0];
        sendImage(file);
    };

    useEffect(() => {
        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                setFullName(response.data.user.fullName);
                setEmail(response.data.user.email);
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
            title="Настройки"
        >
            <Head>
                <title>Настройки</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.info}>
                    <h2 className={classNames('text', styles.infoTitle)}>
                        Основная информация
                    </h2>
                    <div className={styles.infoColumns}>
                        <div>
                            <div className={styles.infoAvatar}>
                                {image ? (
                                    <Image
                                        src={`${IMAGE_URL}${image}`}
                                        alt="avatar"
                                        fill
                                    />
                                ) : dataUser.avatar ? (
                                    <Image
                                        src={dataUser.avatar}
                                        alt="avatar"
                                        fill
                                    />
                                ) : (
                                    <span className="icon-21"></span>
                                )}
                            </div>
                            <div className="addBlock">
                                <span
                                    onClick={() => inputFileRef.current.click()}
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
                                >
                                    Загузить фото
                                </span>
                                <input
                                    ref={inputFileRef}
                                    type="file"
                                    onChange={(e) => handleChangeFile(e)}
                                    hidden
                                />
                            </div>
                        </div>
                        <div className={styles.infoFlex}>
                            <form>
                                <input
                                    className={classNames(
                                        stylesInput.input,
                                        styles.infoInput
                                    )}
                                    placeholder="Имя пользователя"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                />
                                <input
                                    className={classNames(
                                        stylesInput.input,
                                        styles.infoInput
                                    )}
                                    placeholder="Электронная почта"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p
                                    className={classNames(
                                        'small-text',
                                        success ? styles.success : styles.error
                                    )}
                                >
                                    {success ? success : error}
                                </p>
                                <div
                                    className={styles.securityButtons}
                                    style={{ marginTop: 'auto' }}
                                >
                                    <div></div>
                                    <button
                                        ref={btnRef}
                                        className={classNames(
                                            stylesBtn.btn,
                                            'small-text',
                                            stylesBtn.btn__secondary
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSubmit();
                                        }}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.security}>
                    <h2 className={classNames('text', styles.infoTitle)}>
                        Безопасность
                    </h2>
                    <form onSubmit={handleSubmit(onSubmitPassword)}>
                        <input
                            placeholder="Старый пароль"
                            type="password"
                            className={classNames(
                                stylesInput.input,
                                styles.securityInput
                            )}
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <input
                            placeholder="Новый пароль"
                            type="password"
                            className={classNames(
                                stylesInput.input,
                                styles.securityInput
                            )}
                            {...register('newPassword', {
                                required: true,
                            })}
                        />
                        <input
                            placeholder="Повторите пароль"
                            type="password"
                            className={classNames(
                                stylesInput.input,
                                styles.securityInput
                            )}
                            {...register('repeatPassword', {
                                required: true,
                            })}
                        />
                        <p
                            className={classNames(
                                'small-text',
                                successPas ? styles.success : styles.error
                            )}
                        >
                            {successPas ? successPas : errorPas}
                        </p>
                        <div
                            className={styles.securityButtons}
                            style={{ marginTop: 'auto' }}
                        >
                            <div></div>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={classNames(
                                    stylesBtn.btn,
                                    'small-text',
                                    stylesBtn.btn__secondary
                                )}
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
                <div className={styles.order}>
                    <h2 className={classNames('text', styles.infoTitle)}>
                        Управление заказами
                    </h2>
                    <div className={styles.orderBlock}>
                        <CustomSelect
                            default={dataUser.rushOrder}
                            isSearchable={false}
                            height="43px"
                            width="100%"
                            options={measure}
                            placeholder="Срочный заказ"
                            setGroupIcon={(e) => onSubmitSelect(e)}
                        />
                        <div
                            className={classNames(
                                stylesTooltip.tooltip,
                                styles.orderTooltip
                            )}
                        >
                            <span className="icon-22"></span>
                            <Tooltip>
                                <span className="small-text">
                                    Помечать заказ как “Срочный” (
                                    <i className="icon-27"></i>) за 2 дня до
                                    даты заказа
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
