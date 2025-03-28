import { IUsuario } from "../models/IUsuario";

// Agregar peliculas
export const registerUserToDatabase = async (newUsuario: IUsuario): Promise<IUsuario> => {
    // Simulamos una llamada POST para agregar un nuevo elemento
    console.log(`Elemento agregado al servidor: ${newUsuario}`);
    return newUsuario; // Simula obtener los datos actualizados
   
};