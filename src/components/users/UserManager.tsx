import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import UserTable from "./UserTable";
import UserFormModal from "./UserFormModal";
import { getUsers, addUser, updateUser, deleteUser } from "../../services/UserService";

const UserManager: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAdd = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
        message.success("Usuario eliminado");
        fetchUsers();
    };

    const handleSubmit = async (user: any) => {
        if (editingUser) {
            await updateUser(user);
            message.success("Usuario actualizado");
        } else {
            await addUser(user);
            message.success("Usuario creado");
        }
        setModalOpen(false);
        fetchUsers();
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