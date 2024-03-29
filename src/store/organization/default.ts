import { IOrganization } from ".";
import { defaultAddress, defaultPhone, defaultSocialMedia } from "../default";

export const organizationBase: IOrganization = {
  name: "",
  email: "",
  activeSubscription: false,
  createdBy: "",
  createdAt: new Date(),
  deleted: false,
  description: "",
  founded: null,
  id: "",
  isSubOrganization: false,
  isVerified: false,
  logoUrl: "",
  mailingAddress: defaultAddress,
  physicalAddress: defaultAddress,
  mainOrganizationId: "",
  phone: defaultPhone,
  size: "0",
  socialMedia: defaultSocialMedia,
  status: "pending",
  type: "main",
  website: "",
  updatedAt: new Date(),
  updatedBy: "",
  slogan: "",
  corporationType: "",
  organizationValidations:{
    hasValidOrganizationInfo: false,
    hasValidOrganizationSize: false,
    hasValidOrganiztionContact: false
  }
};
