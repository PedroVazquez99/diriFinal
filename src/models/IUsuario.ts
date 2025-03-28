export interface IUsuario {
    nombre: string;
    email: string;
    password: string;
    rol: Rol;
  }
  
  export enum Rol {
    ADMIN = "admin",
    REGISTRADO = "registrado",
    INVITADO = "invitado",
  }
  