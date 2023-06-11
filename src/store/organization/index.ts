import { defineStore } from "pinia";
import { IAddress, IPhone } from "../users";
import { getRequest, putRequest } from "../../axios/privateRequest";
import { organizationBase } from "./default";

// Interface for the organization document
export interface IOrganization {
  id: string;
  name: string;
  description: string;
  website: string;
  founded: Date | null;
  email: string;
  phone: IPhone;
  isVerified: boolean;
  physicalAddress: IAddress;
  mailingAddress: IAddress;
  type: "main" | "sub";
  isSubOrganization: boolean;
  mainOrganizationId: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  logoUrl: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedIn: string;
    instagram: string;
  };
  status: OrganizationStatus;
  deleted: boolean;
  createdBy: string;
  activeSubscription: boolean;
  size: "0" | "1-1" | "2-10" | "10-50" | "50+";
  slogan: string;
  corporationType: string;
}

type OrganizationStatus = "active" | "suspended" | "pending";
export const organizationStatus: OrganizationStatus[] = [
  "active",
  "suspended",
  "pending",
];

interface IOrganizationState {
  organization: IOrganization;
  organizations: IOrganization[] | null;
  id: string;
  fetchData: boolean;
}

export const useOrganizationStore = defineStore({
  id: "organization",
  state: (): IOrganizationState => ({
    organization: organizationBase,
    organizations: null,
    id: "",
    fetchData: false,
  }),
  actions: {
    setOrganization(organization: IOrganization): void {
      this.organization = { ...organization, ...this.organization };
    },

    async getOrganization(payload: { organizationId: string }) {
      this.fetchData = true;
      try {
        const { data } = await getRequest(
          `/api/organizations/${payload.organizationId}`
        );
        this.setOrganization({ ...data.response });
        return { ...data.response };
      } finally {
        this.fetchData = false;
      }
    },
    async updateOrganization(
      organizationId: string,
      payload: Partial<IOrganization>
    ) {
      this.fetchData = true;
      try {
        const { data } = await putRequest(
          `/api/organizations/${organizationId}`,
          payload
        );
        this.setOrganization({ ...data.response });
        return { ...data.response };
      } finally {
        this.fetchData = false;
      }
    },
  },
});
