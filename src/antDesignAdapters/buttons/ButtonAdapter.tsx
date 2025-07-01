import { Button, ButtonProps } from 'antd';

interface ButtonAdapterProps {
    children?: React.ReactNode;
    onChange?: () => void;
}

const ButtonAdapter: React.FC<ButtonAdapterProps> = ({
    children,
    onChange,
    ...rest
}) => {
    return (
        <Button
            onClick={() => onChange?.()}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ButtonAdapter;