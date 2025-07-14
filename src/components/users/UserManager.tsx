import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import UserTable from "./UserTable";
import UserFormModal from "./UserFormModal";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHook";
import { fetchUsers, createUser, editUser, removeUser } from "../../slices/UserSlice";
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from "react-intl";


const UserManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: users, loading } = useAppSelector((state) => state.users);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleAdd = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (userId: string) => {
        await dispatch(removeUser(userId));
        message.success("Usuario eliminado");
    };

    const handleSubmit = async (user: any) => {
        if (editingUser) {
            await dispatch(editUser(user));
            message.success("Usuario actualizado");
        } else {
            await dispatch(createUser(user));
            message.success("Usuario creado");
        }
        setModalOpen(false);
    };

    const normalizedUsers = users.map((user: any) => {

        if ('email' in user) {
            // Usuario plano
            return {
                ...user,
                email: user.email,
                role: user.roles?.admin ?? false, // Asumiendo que 'roles' es un objeto con 'admin'
            };
        }

        // Usuario con datos anidados en 'roles'
        return {
            ...user,
            email: user.roles?.email ?? 'Sin email',
            role: user.roles?.roles?.admin ?? false,
        };
    });

    return (

        <Card
            title={<FormattedMessage id="app.title.manageUsers" />}
            extra={<Button type="primary"
                onClick={handleAdd}
                icon={<PlusOutlined />}
                size="large" />}
        >
            <UserTable
                users={normalizedUsers}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <UserFormModal
                open={modalOpen}
                user={editingUser}
                onCancel={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Card>
    );
};

export default UserManager;