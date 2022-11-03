import Select from 'react-select';

const customStyles = {
    placeholder: (provided) => ({
        ...provided,
        color: '#cccccc',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '8px',
        height: '43px',
        boxShadow: 'none',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '150%',
        borderColor: '#cccccc',
        padding: '0 2px',
        textAlign: 'left',
        '&:hover': {
            borderColor: '#7a7a7a',
            cursor: 'pointer',
        },
    }),
    container: (provided) => ({
        ...provided,
        width: '280px',
        margin: '0 auto',
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '150%',
        textAlign: 'left',
        padding: '8px 0 8px 12px',
        backgroundColor: state.isSelected ? '#F4F2F1' : '',
        color: state.isSelected ? '#002222' : '',
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
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '120px',
    }),
};

function CustomSelect(props) {
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
            required
        />
    );
}

export { CustomSelect };
