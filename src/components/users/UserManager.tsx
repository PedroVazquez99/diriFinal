import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import UserTable from "./UserTable";
import UserFormModal from "./UserFormModal";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHook";
import { fetchUsers, createUser, editUser, removeUser } from "../../slices/UserSlice";

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

    return (
        <Card
            title="Gestión de Usuarios"
            extra={<Button type="primary" onClick={handleAdd}>Nuevo usuario</Button>}
        >
            <UserTable
                users={users}
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