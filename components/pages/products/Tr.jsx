import classNames from 'classnames';
import { useRef } from 'react';
import { TableCell } from '../../TableCell';
import { CustomSelect } from '../../CustomSelect/';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ item, tr, setTr, index, measure }) {
    const selectRef = useRef('');

    return (
        <div className={stylesTable.wrapper}>
            <div
                className={stylesTable.tr}
                style={{
                    gridTemplateColumns: '40% 15% 15% 15% 15%',
                }}
            >
                {Object.keys(item).map((keyObj) => (
                    <>
                        {keyObj === 'unit' ? (
                            <div className={stylesTable.td}>
                                <CustomSelect
                                    key={Math.random()}
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
                                />
                            </div>
                        ) : (
                            keyObj !== 'unit' && (
                                <TableCell
                                    key={Math.random()}
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
                        )}
                    </>
                ))}
            </div>
            <div className={classNames(stylesTable.td, stylesTable.tdDelete)}>
                <span
                    onClick={() => {
                        tr.splice(index, 1);
                        setTr([...tr]);
                    }}
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
        </div>
    );
}

export { Tr };
