import { db } from "../../firebase/firebase";
import { ref, get, set, remove, update, push } from "firebase/database";

// Obtener todos los usuarios
export const getUsers = async () => {
    const snapshot = await get(ref(db, "users"));
    if (!snapshot.exists()) return [];
    // Convierte el objeto en array con id
    return Object.entries(snapshot.val()).map(([id, value]: any) => ({
        id,
        ...value,
    }));
};

// Añadir usuario
export const addUser = async (user: any) => {
    const newUserRef = push(ref(db, "users"));
    await set(newUserRef, user);
};

// Actualizar usuario
export const updateUser = async (user: any) => {
    if (!user.id) return;
    await update(ref(db, `users/${user.id}`), user);
};

// Eliminar usuario
export const deleteUser = async (id: string) => {
    await remove(ref(db, `users/${id}`));
};