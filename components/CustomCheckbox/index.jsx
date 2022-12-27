import stylesCheckbox from './Checkbox.module.scss';

function Checkbox({ checkbox, clickHandler }) {
    return (
        <label className={stylesCheckbox.customCheckbox}>
            <input type="checkbox" checked={checkbox} />
            <span onClick={(e) => clickHandler()}></span>
        </label>
    );
}

export { Checkbox };
