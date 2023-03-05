import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import { CustomSelect } from '../../CustomSelect/';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ item, tr, setTr, index, measure, recipe, setActive }) {
    const clickHandler = () => {
        let flag = false;
        recipe.map((b) => {
            b.products.map((product) => {
                product.products.map((a) => {
                    if (
                        a.product.value === item.id ||
                        item.id === '78ca81be-b864-cd43-54ff-1f695c3dc556'
                    )
                        flag = true;
                });
            });
        });
        if (flag) {
            setActive(true);
        } else {
            tr.splice(index, 1);
            setTr([...tr]);
        }
    };

    return (
        <div className={stylesTable.wrapper}>
            <div
                className={stylesTable.tr}
                style={{
                    gridTemplateColumns: '40% 20% 20% 20%',
                }}
            >
                {Object.keys(item).map((keyObj) =>
                    keyObj === 'unit' ? (
                        <div key={item.id + keyObj} className={stylesTable.td}>
                            <CustomSelect
                                key={keyObj}
                                isSearchable={false}
                                height="35px"
                                width="100%"
                                contHeight="33px"
                                options={measure}
                                placeholder=""
                                default={item.unit}
                                setGroupIcon={(e) => {
                                    tr[index] = {
                                        ...tr[index],
                                        unit: e,
                                    };
                                }}
                                portalTarget={true}
                                disabled={true}
                            />
                        </div>
                    ) : (
                        keyObj !== 'id' && (
                            <TableCell
                                key={keyObj}
                                value={item[keyObj]}
                                thValue={keyObj}
                                type={keyObj === 'name' ? 'text' : 'number'}
                                tr={tr}
                                index={index}
                                saveSettings={(item, thValue, index) => {
                                    tr[index] = {
                                        ...tr[index],
                                        [thValue]: item,
                                    };
                                }}
                            />
                        )
                    )
                )}
            </div>
            <div className={classNames(stylesTable.td, stylesTable.tdDelete)}>
                <span
                    title="Удалить"
                    onClick={() => clickHandler()}
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
        </div>
    );
}

export { Tr };
