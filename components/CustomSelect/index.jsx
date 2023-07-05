import Select from 'react-select';

function CustomSelect(props) {
    const styles = {
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '150%',
        textAlign: 'left',
    };

    const customStyles = {
        placeholder: (provided) => ({
            ...provided,
            color: '#cccccc',
        }),
        control: (provided) => ({
            ...provided,
            ...styles,
            borderRadius: '8px',
            boxShadow: 'none',
            pointerEvents: props.disabled ? 'auto' : 'none',
            borderColor: '#cccccc',
            padding: '0 2px',
            minHeight: props.height,
            '&:hover': {
                borderColor: '#7a7a7a',
                cursor: 'pointer',
            },
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: props.contHeight,
        }),
        container: (provided) => ({
            ...provided,
            width: props.width,
            margin: '0 auto',
        }),
        option: (provided, state) => ({
            ...provided,
            ...styles,
            cursor: 'pointer',
            padding: '8px 0 8px 12px',
            backgroundColor: state.isSelected && '#F4F2F1',
            color: state.isSelected && '#002222',
            '&:active': {
                backgroundColor: '#F4F2F1',
            },
            '&:hover': {
                backgroundColor: '#F4F2F1',
            },
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
            boxShadow: 'none',
            overflow: 'hidden',
            border: '1px solid #009998',
            minHeight: '43px',
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: '125px',
        }),
        noOptionsMessage: (provided) => ({
            ...provided,
            marginTop: '3px',
            textAlign: 'left',
            fontSize: '12px',
            color: '#cccccc',
        }),
    };

    const table = document.querySelector('.table');

    return (
        <Select
            styles={customStyles}
            options={props.options}
            placeholder={props.placeholder}
            isSearchable={props.isSearchable}
            getOptionLabel={props.getOptionLabel}
            register={props.register}
            value={props.value}
            onChange={props.setGroupIcon}
            defaultValue={props.default}
            onMenuClose={() => {
                table && table.classList.remove('lock');
            }}
            onMenuOpen={() => {
                table && table.classList.add('lock');
            }}
            noOptionsMessage={() => 'Ничего не найдено'}
            menuPortalTarget={props.portalTarget && document.body}
        />
    );
}

export { CustomSelect };
