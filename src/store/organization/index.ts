import { defineStore } from "pinia";
import { IAddress, IPhone } from "../users";
import { getRequest, putRequest } from "../../axios/privateRequest";
import { organizationBase } from "./default";
import { mergeObjects } from "../../helpers/mergeObjects";

// Interface for the organization document
export interface IOrganizationValidations {
  hasValidOrganizationInfo: boolean;
  hasValidOrganizationSize: boolean;
  hasValidOrganiztionContact: boolean;
}
export interface ISubscriptionInfo{
  hasSelectedSubscription: boolean;
  hasActiveSubscription: boolean;
}
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

  // Virtuals
  organizationValidations?: IOrganizationValidations;
  subscriptionInfo?: ISubscriptionInfo
  subscription?:any;
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
      const mergedOrg = mergeObjects(this.organization, organization)
      this.organization = mergedOrg;
    },
    async fetchOrganization(payload: { organizationId: string }) {
      this.fetchData = true;
      try {
        const { data } = await getRequest(
          `/api/${payload.organizationId}/organizations`
        );
        this.setOrganization(data.response);
        return data.response;
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
          `/api/${organizationId}/organizations`,
          payload
        );
        this.setOrganization(data.response);
        return data.response;
      } finally {
        this.fetchData = false;
      }
    },
  },
  getters: {
    getOrganization: (state) => {
      return state.organization;
    },
  },
});
