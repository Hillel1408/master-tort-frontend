import styles from '../Table/Table.module.scss';
import { useState } from 'react';
import { settingsNameTh } from '../../data/settings';

function TableTd({ value, type, disabled, setSettings, settings, thValue }) {
    const [item, setItem] = useState(value);
    const [toggleBtn, setToggleBtn] = useState(false);

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            setSettings({
                ...settings,
                [thValue]: item,
            });
        }
    };

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
                    onChange={({ target }) => {
                        target.value === '0' || target.value < 0
                            ? ''
                            : setItem(target.value);
                    }}
                    onClick={() => setToggleBtn(!toggleBtn)}
                    onBlur={(e) => {
                        setToggleBtn(!toggleBtn);
                        setItem(value);
                    }}
                    onKeyDown={handleKey}
                />
            )}
            {toggleBtn && (
                <button
                    class="input__btn"
                    onMouseDown={() => {
                        setSettings({
                            ...settings,
                            [thValue]: item,
                        });
                    }}
                ></button>
            )}
        </div>
    );
}

export { TableTd };
