import { IUsuario, Rol } from "../models/IUsuario";
import { registerUserToDatabase } from "../services/RegsterService";

export class RegisterVM {

    private subscribers: Array<() => void> = [];
    private usuario: IUsuario;
    private passwordRepeat: string = "";
    
    constructor(){
        this.usuario = {nombre: "", password: "", rol: Rol.INVITADO, email: ""};
    }

    // Meter usuario
    public async registerUsuario(newUsuario: IUsuario): Promise<void> {
        if (newUsuario) {
            
            this.usuario = newUsuario; // Decimos que sera el mismo usuario
            this.usuario.rol = Rol.REGISTRADO; // Cambiamos el rol a registrado

            this.usuario = await registerUserToDatabase(newUsuario);
            this.notifyChange();
        }
    }

    public getUsuario(): IUsuario { return this.usuario;}
    public getPasswordRepeat(): string { return this.passwordRepeat; }

    public async handleSubmit (event: React.FormEvent): Promise<boolean> {
        
        console.log(this.usuario);
        if (this.usuario.nombre !== "" && 
            this.usuario.password !== "" && 
            this.usuario.password !== this.passwordRepeat) {
            return false;
        }
        console.log("Registrado");
        event.preventDefault();
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
