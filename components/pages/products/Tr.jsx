import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import { CustomSelect } from '../../CustomSelect/';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ item, tr, index }) {
    return (
        <div className={stylesTable.wrapper}>
            <div
                className={stylesTable.tr}
                style={{
                    gridTemplateColumns: '20% 20% 20% 20% 20%',
                }}
            >
                {Object.keys(item).map((keyObj) => (
                    <>
                        {keyObj === 'measure' ? (
                            <div className={stylesTable.td}>
                                <CustomSelect
                                    isSearchable={false}
                                    height="35px"
                                    options={item.measure}
                                    placeholder=""
                                />
                            </div>
                        ) : (
                            <TableCell
                                key={Math.random()}
                                value={item[keyObj]}
                                thValue={keyObj}
                                type="number"
                                tr={tr}
                                index={index}
                                saveSettings={(item, thValue, index) => {
                                    tr[index] = {
                                        ...tr[index],
                                        [thValue]: item,
                                    };
                                }}
                            />
                        )}
                    </>
                ))}
            </div>
            <div className={classNames(stylesTable.td, stylesTable.tdDelete)}>
                <span
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
        </div>
    );
}

export { Tr };
