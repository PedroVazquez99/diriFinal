import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { authService } from '../services/AuthService';
import { Role } from '../models/IRole';

interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
    loading: boolean;
}

export const AuthContext =
    createContext<AuthContextProps>({
        user: null, roles: null, loading: true
    });

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const userRoles = await authService.getUserRoles(currentUser);
                    setRoles(userRoles);
                } catch (error) {
                    console.error('Error al obtener los roles:', error);
                    setRoles(null);
                }
            }
            else {
                setRoles(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) {
        // Puedes poner un spinner, skeleton, etc.
        return <div>Cargando...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, roles, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};
