import { IUser } from "./models";

export class Users {
    private static password = "secret_sauce";

    private static createUser(username: string, firstName?: string, lastName?: string, postalCode?: string): IUser {
        return { username, password: this.password, firstName, lastName, postalCode }
    }

    public static standardUser(): IUser {
        return this.createUser("standard_user", 'firstName', 'lastName', '12345');
    }

    public static lockedOutUser() {
        return this.createUser("locked_out_user");
    }
}

// for testing purposes let's assume that lowest and highest prices are constant and known
export const lowestPrice = '7.99';
export const highestPrice = '49.99';

export enum SortingOptions {
    defaultOption = 'Name (A to Z)',
    descendingAlphabetical = 'Name (Z to A)',
    ascendingPrice = 'Price (low to high)',
    descendingPrice = 'Price (high to low)'
}