import classNames from 'classnames';
import uuid from 'react-uuid';
import stylesTable from '../../Table/Table.module.scss';
import { Tr } from './Tr';
import styles from '../../../pages/recipe/Recipe.module.scss';
import { useState } from 'react';
import stylesInput from '../../Input/Input.module.scss';
import stylesBtn from '../../Btn/Btn.module.scss';
import { Tooltip } from '../../Tooltip';

function Block({ item, setBlock, blockIndex, block, select }) {
    const [visiblePopup, setVisiblePopup] = useState('');
    const [value, setValue] = useState(item.title);

    const trValue = { product: { value: '', label: '' }, gross: '', net: '' };

    const clickHandler = () => {
        const id = uuid();
        block[blockIndex].products = [
            ...block[blockIndex].products,
            { ...trValue, id: id },
        ];
        setBlock([...block]);
    };

    const clickHandlerBlock = () => {
        block.splice(blockIndex, 1);
        setBlock([...block]);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        block[blockIndex].title = value;
        setVisiblePopup('');
        setValue('');
    };

    return (
        <div className={stylesTable.block}>
            <div className={classNames('text', stylesTable.title)}>
                <div className={stylesTable.titleWrapper}>
                    {item.title}
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => setVisiblePopup(e)}
                    >
                        <path
                            d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.638 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825V3.36825Z"
                            fill="black"
                        />
                    </svg>
                    {visiblePopup && (
                        <Tooltip
                            style={styles.tooltiptext}
                            visiblePopup={visiblePopup}
                            setVisiblePopup={setVisiblePopup}
                            close={true}
                        >
                            <input
                                className={stylesInput.input}
                                placeholder="Введите название"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={handleKey}
                            />
                            <button
                                className={classNames(
                                    stylesBtn.btn,
                                    stylesBtn.btn__secondary,
                                    'small-text'
                                )}
                                style={{
                                    width: '100%',
                                    marginTop: '10px',
                                }}
                                onClick={() => {
                                    if (value) {
                                        handleSubmit();
                                    }
                                }}
                            >
                                Изменить
                            </button>
                        </Tooltip>
                    )}
                </div>
                <span
                    onClick={() => clickHandlerBlock()}
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
            {item.products.length > 0 && (
                <div className={stylesTable.tbody}>
                    {item.products.map((item, index) => (
                        <Tr
                            key={item.id}
                            item={item}
                            index={index}
                            blockIndex={blockIndex}
                            block={block}
                            setBlock={setBlock}
                            select={select}
                        />
                    ))}
                </div>
            )}
            <div className={classNames('addBlock', stylesTable.addBlock)}>
                <span
                    className={classNames('icon-8', 'small-text')}
                    onClick={() => clickHandler()}
                >
                    Добавить продукт
                </span>
            </div>
        </div>
    );
}

export { Block };
