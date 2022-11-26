import classNames from 'classnames';
import { useRef } from 'react';
import { TableCell } from '../../TableCell';
import { CustomSelect } from '../../CustomSelect/';
import stylesInput from '../../Input/Input.module.scss';
import stylesTable from '../../Table/Table.module.scss';

function Tr({ item, index, blockIndex, block, setBlock }) {
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
                <div className={stylesTable.td}>
                    <input
                        type="number"
                        name=""
                        className={stylesInput.input}
                    />
                </div>
                <div className={stylesTable.td}>
                    <input
                        type="number"
                        name=""
                        className={stylesInput.input}
                    />
                </div>
                <div className={stylesTable.td}>
                    <input
                        type="number"
                        name=""
                        className={stylesInput.input}
                    />
                </div>
            </div>
            <div className={classNames(stylesTable.td, stylesTable.tdDelete)}>
                <span
                    onClick={() => clickHandler()}
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
        </div>
    );
}

export { Tr };
