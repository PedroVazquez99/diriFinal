import React from 'react';
import { Switch, SwitchProps } from 'antd';

interface SwitchAdapterProps extends Omit<SwitchProps, 'onChange' | 'checked'> {
    value?: boolean | undefined; // el valor actual del switch
    onChange?: (value: boolean) => void; // función para manejar el cambio
}

const SwitchAdapter: React.FC<SwitchAdapterProps> = ({
    value = false,
    onChange,
    ...rest
}) => {
    const handleChange = (checked: boolean) => {
        onChange?.(checked);
    };

    return (

        <Switch
            checked={value}
            onChange={handleChange}
            {...rest} />

    );
};

export default SwitchAdapter;
