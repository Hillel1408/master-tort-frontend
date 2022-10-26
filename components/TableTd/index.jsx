import styles from '../Table/Table.module.scss';
import { useState } from 'react';
import { settingsNameTh } from '../../data/settings';

function TableTd({ value, type, disabled, setSettings, settings, thValue }) {
    const [item, setItem] = useState(value);
    return (
        <div className={styles.td}>
            {disabled ? (
                <input
                    class="input"
                    value={settingsNameTh[thValue]}
                    disabled={disabled}
                />
            ) : (
                <input
                    class="input"
                    value={item}
                    type={type}
                    disabled={disabled}
                    onChange={({ target }) => setItem(target.value)}
                    onBlur={() => {
                        setSettings({
                            ...settings,
                            [thValue]: Number(item),
                        });
                    }}
                />
            )}
        </div>
    );
}

export { TableTd };
