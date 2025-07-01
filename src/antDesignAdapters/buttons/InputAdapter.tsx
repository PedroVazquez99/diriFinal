import { Input, } from 'antd';


const InputAdapter = ({
    ...rest
}) => {

    return (

        <Input {...rest} />

    );
};

export default InputAdapter;
