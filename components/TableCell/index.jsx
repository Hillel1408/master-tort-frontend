import { useState } from 'react';
import styles from '../../components/Table/Table.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import { settingsNameTh } from '../../data/settings';

function TableCell({ value, type, disabled, thValue, index, saveSettings }) {
    const [item, setItem] = useState(value);

    const handleKey = (e) => {
        if (e.key === 'Enter' && item !== value) {
            saveSettings(item, thValue, index);
            e.target.blur();
        }
    };

    return (
        <div className={styles.td}>
            {disabled ? (
                <input
                    className={stylesInput.input}
                    value={settingsNameTh[thValue]}
                    disabled={disabled}
                />
            ) : (
                <input
                    class={stylesInput.input}
                    value={item}
                    type={type}
                    disabled={disabled}
                    onChange={({ target }) => {
                        target.value === '0' || target.value < 0
                            ? ''
                            : setItem(target.value);
                    }}
                    onBlur={() => saveSettings(item, thValue, index)}
                    onKeyDown={handleKey}
                />
            )}
        </div>
    );
}

export { TableCell };