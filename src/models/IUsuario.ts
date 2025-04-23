import { Role } from "./IRole";

export interface IUsuario {
    nombre: string;
    email: string;
    password: string;
    role: Role;
  }
  