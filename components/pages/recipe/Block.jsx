import classNames from 'classnames';
import stylesTable from '../../Table/Table.module.scss';
import { Tr } from './Tr';

function Block({ item, setBlock, blockIndex, block, select }) {
    const trValue = { product: { value: '', label: '' }, gross: '', net: '' };

    const clickHandler = () => {
        block[blockIndex].products = [...block[blockIndex].products, trValue];
        setBlock([...block]);
    };

    const clickHandlerBlock = () => {
        block.splice(blockIndex, 1);
        setBlock([...block]);
    };

    return (
        <div className={stylesTable.block}>
            <div className={classNames('text', stylesTable.title)}>
                {item.title}
                <span
                    onClick={() => clickHandlerBlock()}
                    className={classNames('icon-11', stylesTable.delete)}
                ></span>
            </div>
            {item.products.length > 0 && (
                <div className={stylesTable.tbody}>
                    {item.products.map((item, index) => (
                        <Tr
                            key={Math.random()}
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
