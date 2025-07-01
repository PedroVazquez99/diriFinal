import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface RegisterRouteProps {
    children: JSX.Element;
}

export const RegisterRoute: React.FC<RegisterRouteProps> = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Cargando...</div>;
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};