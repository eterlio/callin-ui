import { defineStore } from "pinia";
export interface IPhone {
  prefix: string;
  number: string;
  country: string;
}
export type UserRole =
  | "admin"
  | "organizationadmin"
  | "subadmin"
  | "secretary"
  | "lawyer"
  | "client"
  | "support";
export interface IUser {
  email: string;
  phone: IPhone;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  permission: {
    access: number;
  };
  physicalAddress: IAddress;
  mailingAddress: IAddress;
  belongsToOrg: boolean;
  organizationIds: string;
  status: UserStatus;
  isDeleted: boolean;
  isLoggedIn: boolean;
  dateOfBirth: Date;
  lastLoggedInDate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updateAt: Date;
  subscription: any;
}
export interface IAddress {
  houseNumber: string;
  zipCode: string;
  country: string;
  city: string;
  state: string;
}

export type UserStatus =
  | "active"
  | "suspended"
  | "pendingApproval"
  | "inactive";
interface IUserStore {
  currentUser: IUser | null;
  setUser(user: IUser): void;
  clearUser(): void;
  id: string;
}

interface IUserState {
  currentUser: IUser | null;
}
export interface IUserGetters {
  currentUser: IUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPendingApproval: boolean;
  isInactive: boolean;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => ({
    currentUser: null,
  }),
  actions: {
    setUser(user: IUser): void {
      this.currentUser = user;
    },
    clearUser(this: IUserStore): void {
      this.currentUser = null;
    },
  },
  getters: {
    userPermission(): number {
      return this.currentUser?.permission.access as number;
    },
  },
});
