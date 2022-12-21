import { useState } from 'react';
import styles from '../../components/Table/Table.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';
import { settingsNameTh } from '../../data/settings';
import { useEffect } from 'react';

function TableCell({
    value,
    type,
    disabled,
    thValue,
    index,
    saveSettings,
    purchase,
}) {
    const [item, setItem] = useState('');

    const handleKey = (e) => {
        if (e.key === 'Enter' && item !== value) {
            saveSettings(item, thValue, index);
            e.target.blur();
        }
    };

    useEffect(() => {
        setItem(value);
    }, [value]);

    return (
        <div className={styles.td}>
            {disabled ? (
                purchase ? (
                    <input
                        className={stylesInput.input}
                        value={value}
                        disabled={disabled}
                    />
                ) : (
                    <input
                        className={stylesInput.input}
                        value={settingsNameTh[thValue]}
                        disabled={disabled}
                    />
                )
            ) : (
                <input
                    className={stylesInput.input}
                    value={item}
                    type={type}
                    disabled={disabled}
                    onChange={({ target }) => {
                        target.value < 0 ? '' : setItem(target.value);
                    }}
                    onBlur={(e) => saveSettings(item, thValue, index)}
                    onKeyDown={handleKey}
                />
            )}
        </div>
    );
}

export { TableCell };
