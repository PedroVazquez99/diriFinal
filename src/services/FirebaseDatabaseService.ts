import { getDatabase, ref, get, set } from 'firebase/database';
import {app} from '../../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { Role } from '../models/IRole';
import { IUserDatabaseService } from '../models/IUserDatabaseService';

export class FirebaseDatabaseService implements IUserDatabaseService {
    async getUserRoles(uid: string): Promise<Role[]> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);
        const snapshot = await get(rolesRef);

        if (snapshot.exists()) {
            const rolesData = snapshot.val();
            const roles: Role[] = [];

            if (rolesData.admin === true) {
                roles.push(Role.ADMIN);
            }

            // Aquí se pueden agregar otros roles según se requiera.
            if (roles.length === 0) {
                // Si no se ha asignado ningún rol, se asume el rol de usuario.
                roles.push(Role.INVITADO);
            }

            return roles;
        }

        return [Role.INVITADO]; // Si no existe el usuario, se devuelve el rol de invitado por defecto.
    }

    async setUserRoles(uid: string, roles: any): Promise<void> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);
        const snapshot = set(rolesRef, roles);
    }
}
