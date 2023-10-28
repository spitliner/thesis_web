export type RegisterUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    role: 'ADMIN' | 'USER';
};

export type LoginUser = {
    email: string;
    password: string;
}

export type AuthResponse = {
    jwt: string;
    user: RegisterUser;
};