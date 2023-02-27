import classNames from 'classnames';
import { TableCell } from '../../TableCell';
import { CustomSelect } from '../../CustomSelect/';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ item, index, blockIndex, block, setBlock, select, isEdit }) {
    const clickHandler = () => {
        block[blockIndex].products.splice(index, 1);
        setBlock([...block]);
    };

    return (
        <div className={stylesTable.wrapper}>
            <div
                className={stylesTable.tr}
                style={{
                    gridTemplateColumns: '33.33% 33.33% 33.33%',
                }}
            >
                {Object.keys(item).map((keyObj) =>
                    keyObj === 'product' ? (
                        <div key={item.id + keyObj} className={stylesTable.td}>
                            <CustomSelect
                                disabled={isEdit}
                                default={item.product}
                                key={keyObj}
                                isSearchable={true}
                                height="35px"
                                width="100%"
                                contHeight="33px"
                                placeholder=""
                                portalTarget={true}
                                options={select}
                                setGroupIcon={(e) => {
                                    block[blockIndex].products[index].product =
                                        e;
                                }}
                            />
                        </div>
                    ) : (
                        keyObj !== 'id' && (
                            <TableCell
                                key={keyObj}
                                value={
                                    keyObj === 'net'
                                        ? Number(item[keyObj]).toFixed(1)
                                        : item[keyObj]
                                }
                                thValue={keyObj}
                                type={keyObj === 'name' ? 'text' : 'number'}
                                index={index}
                                saveSettings={(item, thValue, index) => {
                                    block[blockIndex].products[index] = {
                                        ...block[blockIndex].products[index],
                                        [thValue]: item,
                                    };
                                }}
                                disabled={!isEdit}
                                purchase={true}
                            />
                        )
                    )
                )}
            </div>
            <div className={classNames(stylesTable.td, stylesTable.tdDelete)}>
                <span
                    title="Удалить"
                    onClick={() => (isEdit ? clickHandler() : '')}
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
        </div>
    );
}

export { Tr };
