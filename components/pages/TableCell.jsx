import { useState } from 'react';
import { settingsNameTh } from '../../data/settings';
import styles from '../../components/Table/Table.module.scss';
import stylesInput from '../../components/Input/Input.module.scss';

function TableCell({
    value,
    type,
    disabled,
    setSettings,
    settings,
    thValue,
    index,
}) {
    const [item, setItem] = useState(value);
    const [toggleBtn, setToggleBtn] = useState(false);

    const saveSettings = () => {
        let newValue = settings[thValue];
        newValue[index] = item;
        setSettings({
            ...settings,
            [thValue]: newValue,
        });
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && item != value) {
            saveSettings();
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
                    onClick={() => setToggleBtn(true)}
                    onBlur={() => {
                        setToggleBtn(false);
                        setItem(value);
                    }}
                    onFocus={() => setToggleBtn(true)}
                    onKeyDown={handleKey}
                />
            )}
            {toggleBtn && (
                <button
                    className={stylesInput.input__btn}
                    onMouseDown={() => item !== value && saveSettings()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export { TableCell };
