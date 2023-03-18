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
  permission: number;
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

export const useUserStore = defineStore<IUserStore["id"]>({
  id: "user",
  state: (): IUserState => ({
    currentUser: null,
  }),
  actions: {
    setUser(this: IUserStore, user: IUser): void {
      this.currentUser = user;
    },
    clearUser(this: IUserStore): void {
      this.currentUser = null;
    },
  },
  getters: {
    isLoggedIn(state): boolean {
      return !!(state as IUserState).currentUser;
    },
    isAdmin(state): boolean {
      return (state as IUserState).currentUser?.role === "admin";
    },
    isSuperAdmin(state): boolean {
      return (state as IUserState).currentUser?.role === "organizationadmin";
    },
    isPendingApproval(state): boolean {
      return (state as IUserState).currentUser?.status === "pendingApproval";
    },
    isInactive(state): boolean {
      return (state as IUserState).currentUser?.status === "inactive";
    },
    userPermissions(state): number {
      return (state as IUserState).currentUser?.permission || 0;
    },
  },
});
