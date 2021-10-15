import { CatalogAppDetails } from "../../components/AppCatalog/types";
import {
  AppDetails,
  Filters,
  MarketplacePublisher,
  Pagination,
  PublisherDetails,
  SubbedMarketplaceApp,
  View,
} from "../../pages/Home/types";
import { ErrorReason } from "../../utils/request";

export const GET_DATA = "Markeplace/GET_DATA";

export const GET_ALL_MARKETPLACE_APPS = "Marketplace/GET_ALL_MARKETPLACE_APPS";
export const GET_ALL_MARKETPLACE_LABELS = "Marketplace/GET_ALL_MARKETPLACE_LABELS";
export const GET_ALL_MARKETPLACE_PUBLISHERS = "Marketplace/GET_ALL_MARKETPLACE_PUBLISHERS";
export const GET_FILTERED_MARKETPLACE_APPS = "Marketplace/GET_FILTERED_MARKETPLACE_APPS";
export const SAVE_ALL_FILTERED_MARKETPLACE_APPS = "Marketplace/SAVE_ALL_FILTERED_MARKETPLACE_APPS";
export const SAVE_ALL_MARKETPLACE_APPS = "Marketplace/SAVE_ALL_MARKETPLACE_APPS";
export const SAVE_ALL_MARKETPLACE_LABELS = "Marketplace/SAVE_ALL_MARKETPLACE_LABELS";
export const SAVE_ALL_MARKETPLACE_PUBLISHERS = "Marketplace/SAVE_ALL_MARKETPLACE_PUBLISHERS";

// 'App details' view
export const GET_APP_DETAILS = "Marketplace/GET_APP_DETAILS";
export const SAVE_APP_DETAILS = "Marketplace/SAVE_APP_DETAILS";
export const GET_PUBLISHER_APPS_SAMPLE = "Marketplace/GET_PUBLISHER_APPS_SAMPLE";
export const SAVE_PUBLISHER_APP_SAMPLE = "Marketplace/SAVE_PUBLISHER_APP_SAMPLE";

export const MARKETPLACE_ERRORS_CLEAR = "Marketplace/MARKETPLACE_ERRORS_CLEAR";
export const MARKETPLACE_ERRORS_SET = "Marketplace/MARKETPLACE_ERRORS_SET";

export interface MarketplaceAppsResponse {
  rows: AppDetails[];
  pagination: {
    rowCount: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
}

export interface State {
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

  publisherAppsSample: CatalogAppDetails[];
  retrievedPublisherAppsSample: boolean;

  // 'Publisher details' view
  publisherDetails: PublisherDetails;
  retrievedPublisherDetails: boolean;
  retrievedPublisherDetailsError: boolean;

  allPublisherApps: AppDetails[];
  retrievedAllPublisherApps: boolean;

  view: View;

  error: ErrorReason;
}

export interface Events {
  [GET_DATA]:
    | typeof GET_ALL_MARKETPLACE_APPS
    | typeof GET_ALL_MARKETPLACE_LABELS
    | typeof GET_ALL_MARKETPLACE_PUBLISHERS
    | typeof GET_APP_DETAILS
    | typeof GET_PUBLISHER_APPS_SAMPLE;
  [GET_ALL_MARKETPLACE_APPS]: Partial<Pagination>;
  [GET_ALL_MARKETPLACE_LABELS]: undefined;
  [GET_ALL_MARKETPLACE_PUBLISHERS]: undefined;
  [GET_APP_DETAILS]: number;
  [GET_FILTERED_MARKETPLACE_APPS]: { filters: Filters; view: View };
  [GET_PUBLISHER_APPS_SAMPLE]: { orgID: number; appID: number };
  [MARKETPLACE_ERRORS_CLEAR]: undefined;
  [MARKETPLACE_ERRORS_SET]: ErrorReason;
  [SAVE_ALL_FILTERED_MARKETPLACE_APPS]: Partial<State>;
  [SAVE_ALL_MARKETPLACE_APPS]: State["allMarketplaceApps"];
  [SAVE_ALL_MARKETPLACE_LABELS]: State["allMarketplaceLabels"];
  [SAVE_ALL_MARKETPLACE_PUBLISHERS]: State["allMarketplacePublishers"];
  [SAVE_APP_DETAILS]: State["selectedAppDetails"];
  [SAVE_PUBLISHER_APP_SAMPLE]: State["publisherAppsSample"];
}
