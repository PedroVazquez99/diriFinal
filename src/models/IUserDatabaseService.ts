import { Role } from "./IRole";

export interface IUserDatabaseService {
    getUserRoles(uid: string): Promise<Role[]>;
}