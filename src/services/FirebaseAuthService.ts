// SINGLETON: FirebaseAuthService. Lo consumirá el contexto de autenticación.
import { IAuthService } from "../models/IAuthService";
import { Role } from "../models/IRole";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

import {app} from "../../firebase/firebase"; // Asegúrate de que la ruta sea correcta
import { FirebaseDatabaseService } from "../services/FirebaseDatabaseService";

const auth = getAuth(app);

export class FirebaseAuthService implements IAuthService { 
    private databaseService: FirebaseDatabaseService; 

    constructor() { 
        this.databaseService = new FirebaseDatabaseService(); 
    } 

    signIn(email: string, password: string): Promise<any> { 
        return signInWithEmailAndPassword(auth, email, password); 
    } 

    async signUp(email: string, password: string): Promise<any> {
        console.log("FirebaseAuthService: signUp", email, password); 
        return await createUserWithEmailAndPassword(auth, email, password); 
    } 

    signOut(): Promise<void> { 
        return signOut(auth); 
    }

    onAuthStateChanged(callback: (user: any) => void): () => void { 
        return onAuthStateChanged(auth, callback); 
    } 

    getCurrentUser(): any | null { 
        return auth.currentUser; 
    } 

    async getUserRoles(user: any): Promise<Role[]> { 
        // Para el usuario por defecto, se devuelve siempre el rol ADMIN. 

        // Delegamos la obtención de roles al servicio de base de datos. 
        return this.databaseService.getUserRoles(user.uid); 
    }

    async setUserRoles(uid: string, roles: any): Promise<void> {
        this.databaseService.setUserRoles(uid, roles);
    }
}
