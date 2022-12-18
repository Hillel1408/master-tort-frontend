import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import { CustomSelect } from '../../CustomSelect/';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ select, index, item, items, tableIndex, setItems }) {
    return (
        <div className={stylesTable.wrapper}>
            <div
                className={stylesTable.tr}
                style={{
                    gridTemplateColumns: '25% 25% 25% 25%',
                }}
            >
                {Object.keys(item).map((keyObj) =>
                    keyObj === 'recipe' ? (
                        <div key={item.id + keyObj} className={stylesTable.td}>
                            <CustomSelect
                                key={keyObj}
                                isSearchable={true}
                                height="35px"
                                width="100%"
                                contHeight="33px"
                                options={select}
                                placeholder=""
                                default={item.recipe}
                                setGroupIcon={(e) => {
                                    items[index].table[tableIndex].recipe = e;
                                }}
                                portalTarget={true}
                            />
                        </div>
                    ) : (
                        keyObj !== 'id' && (
                            <TableCell
                                key={keyObj}
                                value={item[keyObj]}
                                thValue={keyObj}
                                type="number"
                                index={index}
                                saveSettings={(item, thValue, index) => {
                                    items[index].table[tableIndex] = {
                                        ...items[index].table[tableIndex],
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
                    className={classNames('icon-11', stylesTable.delete)}
                    onClick={() => {
                        items[index].table.splice(tableIndex, 1);
                        setItems([...items]);
                    }}
                ></span>
            </div>
        </div>
    );
}

export { Tr };
