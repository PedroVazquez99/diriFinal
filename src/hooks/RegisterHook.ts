// MovieVM.ts
import { useEffect, useState } from 'react';
import { RegisterVM } from '../viewModels/RegisterVM';
import { IUsuario } from '../models/IUsuario';


export const useRegisterViewModel = (viewModel: RegisterVM) => {
    const [usuario, setUsuario] = useState<IUsuario>(viewModel.getUsuario());
    const [passwordRepeat, setPasswordRepeat] = useState<string>(viewModel.getPasswordRepeat());
    useEffect(() => {
        // Nos suscribimos a los cambios del ViewModel
        const unsubscribe = viewModel.subscribe(() => {
            setUsuario(viewModel.getUsuario());
            setPasswordRepeat(viewModel.getPasswordRepeat());
        });

        // Al desmontar el componente, nos desuscribimos
        return () => unsubscribe();
    }, [viewModel]);

    return {
        usuario,
        passwordRepeat: passwordRepeat,
        setNombre: (nombre: string) => viewModel.setNombre(nombre),
        setEmail: (email: string) => viewModel.setEmail(email),
        setPassword: (password: string) => viewModel.setPassword(password),
        setPasswordRepeat: (passwordRepeat: string) => viewModel.setPasswordRepeat(passwordRepeat),
    };
};
