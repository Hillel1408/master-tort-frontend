import classNames from 'classnames';
import styles from '../../../pages/Home.module.scss';

function Total({ data, total, totalRef }) {
    return (
        <div>
            <div
                ref={totalRef}
                style={{ marginBottom: '20px', overflow: 'auto' }}
            >
                <div className={styles.cakeData}>
                    {data.map(
                        (item, index) =>
                            index !== data.length - 1 && (
                                <div
                                    key={index}
                                    id={styles.tooltiptext}
                                    className={styles.cakeItem}
                                >
                                    <div>
                                        <div>Порций в {index + 1} ярусе</div>
                                        <div>Вес начинки</div>
                                        {item.calculat.cream && (
                                            <div>Вес выравнивающего крема</div>
                                        )}
                                        {item.calculat.mastic && (
                                            <div>Вес мастики</div>
                                        )}
                                        <div>Общий вес яруса</div>
                                    </div>
                                    <div>
                                        <div>
                                            {item.calculat.portion.toFixed(2)}
                                        </div>
                                        <div>{`${item.calculat.weight.toFixed(
                                            2
                                        )} кг.`}</div>
                                        {item.calculat.cream && (
                                            <div>{`${item.calculat.cream.toFixed(
                                                0
                                            )} гр.`}</div>
                                        )}
                                        {item.calculat.mastic && (
                                            <div>{`${item.calculat.mastic.toFixed(
                                                0
                                            )} гр.`}</div>
                                        )}
                                        <div>{`${item.calculat.totalWeight.toFixed(
                                            2
                                        )} кг.`}</div>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className={classNames('total', 'small-text')}>
                <h2 className={classNames('title', styles.cakeColumnTitle)}>
                    Итого
                </h2>
                <div className={styles.cakeColumns}>
                    <div className={styles.cakeColumn}>
                        <div>Порций в торте</div>
                        <div>{data[data.length - 1].portion.toFixed(2)}</div>
                    </div>
                    {data[data.length - 1].cream !== 0 && (
                        <div className={styles.cakeColumn}>
                            <div>Общий вес выравнивающего крема</div>
                            <div>
                                {`${data[data.length - 1].cream.toFixed(
                                    0
                                )} гр.`}
                            </div>
                        </div>
                    )}
                    {data[data.length - 1].mastic !== 0 && (
                        <div className={styles.cakeColumn}>
                            <div>Общий вес мастики</div>
                            <div>{`${data[data.length - 1].mastic.toFixed(
                                0
                            )} гр.`}</div>
                        </div>
                    )}
                    <div className={styles.cakeColumn}>
                        <div>Общий вес торта</div>
                        <div>{`${data[data.length - 1].totalWeight.toFixed(
                            2
                        )} кг.`}</div>
                    </div>
                    {total.length > 0 && (
                        <div className={styles.cakeColumn}>
                            <div>Себестоимость торта</div>
                            <div>{`${total[total.length - 1].toFixed(
                                2
                            )} руб.`}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export { Total };
