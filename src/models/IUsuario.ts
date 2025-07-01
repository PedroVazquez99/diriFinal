import { Role } from "./IRole";

export interface IUsuario {
    id: string;
    nombre: string;
    email: string;
    password: string;
    role: Role;
  }
  