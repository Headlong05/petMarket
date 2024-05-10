import React from 'react';
import './Input.css'

const Input = ({data, setData, name, type, required, placeholder}) => {
    return (
        <input
            className={'my-input'}
            placeholder={placeholder}
            required={required}
            name={name}
            type={type}
            value={data[name] || ''}
            dateformat='dd.MM.yyyy'
            onChange={(e) => {
                setData({
                    ...data,
                    [e.target.name]: type === 'number' ? e.target.valueAsNumber : e.target.value
                })
            }}
        />
    );
};

export default Input;