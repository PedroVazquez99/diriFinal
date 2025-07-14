import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from '../../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { Role } from '../models/IRole';
import { IUserDatabaseService } from '../models/IUserDatabaseService';

export class FirebaseDatabaseService implements IUserDatabaseService {
    async getUserRoles(uid: string): Promise<Role[]> {

        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);
        const snapshot = await get(rolesRef);

        if (snapshot.exists()) {
            console.log('Roles obtenidos:', snapshot.val());
            const rolesData = snapshot.val();
            const roles: Role[] = [];
            if (rolesData.admin === true) {

                roles.push(Role.ADMIN);
            }
            if (roles.length === 0) {
                // Si no se ha asignado ningún rol, se asume el rol de usuario. 
                roles.push(Role.REGISTRADO);
            }
            return roles;
        }
        return [Role.REGISTRADO];
    }

    async setUserRoles(uid: string, data: { email: string; roles: { admin: boolean } }): Promise<void> {
        const db = getDatabase(app);
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, {
            id: uid,
            email: data.email,
            roles: data.roles,
        });
    }
}