export interface User {
    id: string;
    email: string;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
}
export interface UserRecord {
    id: string;
    zeroId: string;
    email: string;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
}
/** API */
export interface LoginResponse {
    user: User | null;
}
export declare type NewUser = Omit<User, 'id'>;
//# sourceMappingURL=user.interface.d.ts.map