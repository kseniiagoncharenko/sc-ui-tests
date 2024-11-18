export interface IUser {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    postalCode?: string;
}

export interface IProduct {
    name: string;
    price: string;
    quantity?: string;
}