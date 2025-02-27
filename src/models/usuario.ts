export interface Usuario {
  nombre: string;
  password: string;
  rol: Rol;
}

enum Rol {
  Admin = "admin",
  registrado = "registrado",
  invitado = "invitado",
}
