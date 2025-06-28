import React from "react";
import { Modal } from "antd";

interface ModalAdapterProps {
    onClose: () => void;
    open?: boolean;
    title?: string;
    children?: React.ReactNode;
}

const ModalAdapter: React.FC<ModalAdapterProps> = ({ open, onClose, children, title }) => (
    <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        title={title}
        width={600}
    >
        <div className="flex flex-col items-center">
            {children}
        </div>
    </Modal>
);

export default ModalAdapter;