import { CatalogAppDetails } from "../../components/AppCatalog/types";

export const roleNameOptions = ["", "admin", "developer", "organizationOwner"] as const;

export type View = "marketplace" | "publisher";

export interface Response {
  isError: boolean;
  isRequesting: boolean;
}

export interface MarketplacePublisher {
  id: number;
  name: string;
}

export interface SubbedMarketplaceApp {
  description: string;
  id: number;
  logo: string;
  name: string;
  publisherId: number;
  publisherName: string;
  summary: string;
}

export interface Filters {
  label: string[];
  order: "asc" | "desc";
  org_id: number[];
  sort_by: "app" | "org" | "updated";
  page: number;
  pageSize: number;
  search: string;
}

export interface Pagination {
  page: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
}
export interface MarketplaceStore {
  // 'Marketplace' view
  allMarketplaceApps: CatalogAppDetails[];
  allMarketplaceLabels: string[];
  allMarketplacePublishers: MarketplacePublisher[];
  allSubbedMarketplaceApps: SubbedMarketplaceApp[];

  filteredMarketplaceApps: CatalogAppDetails[];

  retrievedAllMarketplaceApps: boolean;
  retrievedAllMarketplaceLabels: boolean;
  retrievedAllMarketplacePublishers: boolean;
  retrievedAllSubbedMarketplaceApps: boolean;

  pagination: Pagination;

  // 'App details' view
  selectedAppDetails: AppDetails;
  retrievedSelectedAppDetails: boolean;

  publisherAppsSample: AppDetails[];
  retrievedPublisherAppsSample: boolean;

  // 'Publisher details' view
  publisherDetails: PublisherDetails;
  retrievedPublisherDetails: boolean;
  retrievedPublisherDetailsError: boolean;

  allPublisherApps: AppDetails[];
  retrievedAllPublisherApps: boolean;

  // 'App creating/editing' views
  marketplaceAppVisibility: "private" | "public";
  marketplaceAppLabels: string[];
}

export type UserProfile = {
  avatar?: string;
  bio?: string;
  email: string;
  id: string;
  last_login: string;
  mobile?: string;
  name: string;
  oidcProvider: string | null;
};

export interface AppDetails {
  createdAt: string;
  description: string;
  directUrl: string;
  id: number;
  images: string[];
  labels: string[];
  logo: string;
  name: string;
  organization: {
    id: string;
    name: string;
    privacyUrl: string;
    supportUrl: string;
    tosUrl: string;
  };
  orgId: number;
  privacyUrl: string;
  shortDescription: string;
  supportUrl: string;
  tosUrl: string;
  updatedAt: string;
  websiteUrl: string;
  youtubeUrl: string;
}

export interface PublisherDetails {
  description: string;
  id: string;
  logo: string;
  name: string;
  privacyUrl: string;
  supportUrl: string;
  tosUrl: string;
  vat: string;
  websiteUrl: string;
  youtubeUrl: string;
}

export type Role = {
  id: string;
  name: typeof roleNameOptions[number];
};

export interface User {
  fName: string;
  id: number;
  lName: string;
  photo?: string;
  role: Role;
}

export interface SocialUrl {
  name: string;
  url: string;
}

export type SettingsStore = SettingsData;

export interface SettingsData {
  clientName: string;
  documentationURL: string;
  portalName: string;
  socialURLs: SocialUrl[];
  supportURL: string;
}

export interface MarketplaceAppsResponse {
  rows: AppDetails[];
  pagination: {
    rowCount: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
}
