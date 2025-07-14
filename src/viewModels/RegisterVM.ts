import { NavigateFunction } from "react-router-dom";
import { Role } from "../models/IRole";
import { IUsuario } from "../models/IUsuario";
import { registerUserToDatabase } from "../services/RegsterService";
import { authService } from "../services/AuthService";
export class RegisterVM {

    private subscribers: Array<() => void> = [];
    private usuario: IUsuario;
    private passwordRepeat: string = "";
    private error: string = '';
    private success: string = '';
    constructor() {
        this.usuario = { id: "0", nombre: "", password: "", role: Role.INVITADO, email: "" };
    }

    // Meter usuario
    public async registerUsuario(newUsuario: IUsuario): Promise<void> {
        if (newUsuario) {

            this.usuario = newUsuario; // Decimos que sera el mismo usuario
            this.usuario.role = Role.REGISTRADO; // Cambiamos el rol a registrado

            this.usuario = await registerUserToDatabase(newUsuario);
            this.notifyChange();
        }
    }

    public getUsuario(): IUsuario { return this.usuario; }
    public getPasswordRepeat(): string { return this.passwordRepeat; }

    public async handleSubmit(e: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction): Promise<boolean> {

        e.preventDefault();
        this.setError('');

        try {

            const userCredential = await authService.signUp(this.usuario.email, this.usuario.password);

            // Crear registro en BBDD con roles iniciales (admin: false)
            console.log("userCredential", userCredential.user.email);
            await authService.setUserRoles(userCredential.user.uid, {
                email: userCredential.user.email,
                roles: { admin: false }
            });
            this.setSuccess('Registro exitoso. Redirigiendo al Inicio...');
            setTimeout(() => {
                navigate('/home'); // Redirigir al Dashboard después de 2 segundos
            }, 1500);

        } catch (error: any) {
            console.error("Error al registrarse:", error);
            this.setError(error.message);
        }
        return true;
        // Refistrar en la BBDD
    };


    // Setters

    public setNombre(nombre: string): void {
        this.usuario.nombre = nombre;
        this.notifyChange();
    }

    public setEmail(email: string): void {
        this.usuario.email = email;
        this.notifyChange();
    }

    public setPassword(password: string): void {
        this.usuario.password = password;
        this.notifyChange();
    }

    public setPasswordRepeat(passwordRepeat: string): void {
        this.passwordRepeat = passwordRepeat;
        this.notifyChange();
    }

    private setError(message: string) {
        this.error = message;
        this.notifyChange();
    }

    private setSuccess(message: string) {
        this.success = message;
        this.notifyChange();
    }

    // Suscripción a cambios
    public subscribe(callback: () => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    // Se notifican los cambios a los suscriptores
    private notifyChange() {
        this.subscribers.forEach(cb => cb());
    }
}
