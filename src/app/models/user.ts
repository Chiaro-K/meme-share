export interface User {
   uid: string;
   email: string;
}

export interface IUser {
   userId: string;
   firstName: string;
   lastName: string;
   username: string;
}

export interface IAddUser {
   username: string;
   firebaseUserId: string;
}