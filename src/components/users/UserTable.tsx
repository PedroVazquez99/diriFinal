import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";

interface Props {
    users: any[];
    loading: boolean;
    onEdit: (user: any) => void;
    onDelete: (userId: string) => void;
}

const UserTable: React.FC<Props> = ({ users, loading, onEdit, onDelete }) => {
    const [page, setPage] = useState(1);

    const columns = [
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Rol",
            key: "role",
            render: (_: any, user: any) =>
                user.role && user.role == true ? "Admin" : "Usuario",
        },
        {
            title: "Acciones",
            key: "actions",
            render: (_: any, user: any) => (
                <>
                    <Button size="small" onClick={() => onEdit(user)} style={{ marginRight: 8 }}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Seguro que quieres eliminar este usuario?"
                        onConfirm={() => onDelete(user.id)}
                    >
                        <Button size="small" danger>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            {console.log(users)}
            <Table
                rowKey="id"
                columns={columns}
                dataSource={users}
                loading={loading}
            />
        </>
    );
};

export default UserTable;