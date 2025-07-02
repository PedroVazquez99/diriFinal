import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

interface Props {
    open: boolean;
    user: any | null;
    onCancel: () => void;
    onSubmit: (user: any) => void;
}

const UserFormModal: React.FC<Props> = ({ open, user, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) form.setFieldsValue(user);
        else form.resetFields();
    }, [user, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            onSubmit({ ...user, ...values, roles: { admin: values.role === "admin" } });
        });
    };

    return (
        <Modal
            open={open}
            title={user ? "Editar usuario" : "Nuevo usuario"}
            onCancel={onCancel}
            onOk={handleOk}
            okText={user ? "Actualizar" : "Crear"}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="Rol" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value={true}>Admin</Select.Option>
                        <Select.Option value={false}>Usuario</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormModal;