import { Action } from 'redux'
import { CatalogAppDetails } from '../../components/AppCatalog/types'

import {
  GET_ALL_MARKETPLACE_APPS_ACTION_SUCCESS,
  GET_ALL_MARKETPLACE_APPS_ACTION,
  GET_ALL_MARKETPLACE_LABELS_ACTION_SUCCESS,
  GET_ALL_MARKETPLACE_LABELS_ACTION,
  GET_ALL_MARKETPLACE_PUBLISHERS_ACTION_SUCCESS,
  GET_ALL_MARKETPLACE_PUBLISHERS_ACTION,
  GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_ERROR,
  GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_SUCCESS,
  GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION,
  GET_APP_DETAILS_ACTION_SUCCESS,
  GET_APP_DETAILS_ACTION,
  GET_FILTERED_MARKETPLACE_APPS_ACTION_SUCCESS,
  GET_FILTERED_MARKETPLACE_APPS_ACTION,
  GET_PUBLISHER_APPS_SAMPLE_ACTION_SUCCESS,
  GET_PUBLISHER_APPS_SAMPLE_ACTION,
  GET_PUBLISHER_DETAILS_ACTION_ERROR,
  GET_PUBLISHER_DETAILS_ACTION_SUCCESS,
  GET_PUBLISHER_DETAILS_ACTION,
  SET_MARKETPLACE_APP_LABELS_ACTION,
  SET_MARKETPLACE_APP_VISIBILITY_ACTION,
  SUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS,
  SUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
  UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS,
  UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
} from './ducks'

export const roleNameOptions = [
  '',
  'admin',
  'developer',
  'organizationOwner',
] as const

export type View = 'marketplace' | 'publisher'

export interface Response {
  isError: boolean
  isRequesting: boolean
}

export interface MarketplacePublisher {
  id: number
  name: string
}

export interface SubbedMarketplaceApp {
  description: string
  id: number
  logo: string
  name: string
  publisherId: number
  publisherName: string
  summary: string
}

export interface Filters {
  label: string[]
  order: 'asc' | 'desc'
  org_id: number[]
  sort_by: 'app' | 'org' | 'updated'
  page: number
  pageSize: number
  search: string
}

export interface Pagination {
  page: number
  pageCount: number
  pageSize: number
  rowCount: number
}
export interface MarketplaceStore {
  // 'Marketplace' view
  allMarketplaceApps: CatalogAppDetails[]
  allMarketplaceLabels: string[]
  allMarketplacePublishers: MarketplacePublisher[]
  allSubbedMarketplaceApps: SubbedMarketplaceApp[]

  filteredMarketplaceApps: CatalogAppDetails[]

  retrievedAllMarketplaceApps: boolean
  retrievedAllMarketplaceLabels: boolean
  retrievedAllMarketplacePublishers: boolean
  retrievedAllSubbedMarketplaceApps: boolean

  pagination: Pagination

  // 'App details' view
  selectedAppDetails: AppDetails
  retrievedSelectedAppDetails: boolean

  publisherAppsSample: AppDetails[]
  retrievedPublisherAppsSample: boolean

  // 'Publisher details' view
  publisherDetails: PublisherDetails
  retrievedPublisherDetails: boolean
  retrievedPublisherDetailsError: boolean

  allPublisherApps: AppDetails[]
  retrievedAllPublisherApps: boolean

  // 'App creating/editing' views
  marketplaceAppVisibility: 'private' | 'public'
  marketplaceAppLabels: string[]
}

export type UserProfile = {
  avatar?: string
  bio?: string
  email: string
  id: string
  last_login: string
  mobile?: string
  name: string
  oidcProvider: string | null
}

export interface AppDetails {
  createdAt: string
  description: string
  directUrl: string
  id: number
  images: string[]
  labels: string[]
  logo: string
  name: string
  organization: {
    id: string
    name: string
    privacyUrl: string
    supportUrl: string
    tosUrl: string
  }
  orgId: number
  privacyUrl: string
  shortDescription: string
  supportUrl: string
  tosUrl: string
  updatedAt: string
  websiteUrl: string
  youtubeUrl: string
}

export interface PublisherDetails {
  description: string
  id: string
  logo: string
  name: string
  privacyUrl: string
  supportUrl: string
  tosUrl: string
  vat: string
  websiteUrl: string
  youtubeUrl: string
}

export type Role = {
  id: string
  name: typeof roleNameOptions[number]
}

export interface User {
  fName: string
  id: number
  lName: string
  photo?: string
  role: Role
}

export interface SocialUrl {
  name: string
  url: string
}

export type SettingsStore = SettingsData

export interface SettingsData {
  clientName: string
  documentationURL: string
  portalName: string
  socialURLs: SocialUrl[]
  supportURL: string
}

export interface GetAllMarketplaceAppsAction extends Action {
  type: typeof GET_ALL_MARKETPLACE_APPS_ACTION
  pagination: { page: number; pageSize: number }
}

export interface GetAllMarketplaceAppsActionSuccess extends Action {
  type: typeof GET_ALL_MARKETPLACE_APPS_ACTION_SUCCESS
  allMarketplaceApps: CatalogAppDetails[]
}

export interface GetAllMarketplaceLabelsAction extends Action {
  type: typeof GET_ALL_MARKETPLACE_LABELS_ACTION
}

export interface GetAllMarketplaceLabelsActionSuccess extends Action {
  type: typeof GET_ALL_MARKETPLACE_LABELS_ACTION_SUCCESS
  allMarketplaceLabels: string[]
}

export interface GetAllMarketplacePublishersAction extends Action {
  type: typeof GET_ALL_MARKETPLACE_PUBLISHERS_ACTION
}

export interface GetAllMarketplacePublishersActionSuccess extends Action {
  type: typeof GET_ALL_MARKETPLACE_PUBLISHERS_ACTION_SUCCESS
  allMarketplacePublishers: MarketplacePublisher[]
}

export interface GetAllSubbedMarketplaceAppsAction extends Action {
  type: typeof GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION
  userID: number
}

export interface GetAllSubbedMarketplaceAppsActionSuccess extends Action {
  type: typeof GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_SUCCESS
  allSubbedMarketplaceApps: SubbedMarketplaceApp[]
}

export interface GetAllSubbedMarketplaceAppsActionError extends Action {
  type: typeof GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_ERROR
}

export interface SubscribeToMarketplaceAppAction extends Action {
  type: typeof SUBSCRIBE_TO_MARKETPLACE_APP_ACTION
  userID: number
  appID: number
}

export interface SubscribeToMarketplaceAppActionSuccess extends Action {
  type: typeof SUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS
}

export interface UnsubscribeToMarketplaceAppAction extends Action {
  type: typeof UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION
  userID: number
  appID: number
}

export interface UnsubscribeToMarketplaceAppActionSuccess extends Action {
  type: typeof UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS
}

export interface GetFilteredAppsMarketplaceAction extends Action {
  type: typeof GET_FILTERED_MARKETPLACE_APPS_ACTION
  filters: Filters
  view: View
}

export interface GetFilteredAppsMarketplaceActionSuccess extends Action {
  type: typeof GET_FILTERED_MARKETPLACE_APPS_ACTION_SUCCESS
  filteredMarketplaceApps: CatalogAppDetails[]
  pagination: Pagination
  view: View
}

export interface GetAppDetailsAction extends Action {
  type: typeof GET_APP_DETAILS_ACTION
  appID: string
}

export interface GetAppDetailsActionSuccess extends Action {
  type: typeof GET_APP_DETAILS_ACTION_SUCCESS
  appDetails: AppDetails
}

export interface GetPublisherAppsSampleAction extends Action {
  type: typeof GET_PUBLISHER_APPS_SAMPLE_ACTION
  orgID: number
  appID: number
}

export interface GetPublisherAppsSampleActionSuccess extends Action {
  type: typeof GET_PUBLISHER_APPS_SAMPLE_ACTION_SUCCESS
  publisherAppsSample: AppDetails[]
}

export interface GetPublisherDetailsAction extends Action {
  type: typeof GET_PUBLISHER_DETAILS_ACTION
  publisherID: string
}

export interface GetPublisherDetailsActionSuccess extends Action {
  type: typeof GET_PUBLISHER_DETAILS_ACTION_SUCCESS
  publisherDetails: PublisherDetails
}

export interface GetPublisherDetailsActionError extends Action {
  type: typeof GET_PUBLISHER_DETAILS_ACTION_ERROR
}

export interface SetMarketplaceAppVisibilityAction extends Action {
  type: typeof SET_MARKETPLACE_APP_VISIBILITY_ACTION
  marketplaceAppVisibility: 'private' | 'public'
}

export interface SetMarketplaceAppLabelsAction extends Action {
  type: typeof SET_MARKETPLACE_APP_LABELS_ACTION
  marketplaceAppLabels: string[]
}

export type MarketplaceActions =
  | GetAllMarketplaceAppsAction
  | GetAllMarketplaceAppsActionSuccess
  | GetAllMarketplaceLabelsAction
  | GetAllMarketplaceLabelsActionSuccess
  | GetAllMarketplacePublishersAction
  | GetAllMarketplacePublishersActionSuccess
  | GetAllSubbedMarketplaceAppsAction
  | GetAllSubbedMarketplaceAppsActionError
  | GetAllSubbedMarketplaceAppsActionSuccess
  | GetAppDetailsAction
  | GetAppDetailsActionSuccess
  | GetFilteredAppsMarketplaceAction
  | GetFilteredAppsMarketplaceActionSuccess
  | GetPublisherAppsSampleAction
  | GetPublisherAppsSampleActionSuccess
  | GetPublisherDetailsAction
  | GetPublisherDetailsActionSuccess
  | GetPublisherDetailsActionError
  | SetMarketplaceAppLabelsAction
  | SetMarketplaceAppVisibilityAction
  | SubscribeToMarketplaceAppAction
  | SubscribeToMarketplaceAppActionSuccess
  | UnsubscribeToMarketplaceAppAction
  | UnsubscribeToMarketplaceAppActionSuccess

export interface MarketplaceAppsResponse {
  rows: AppDetails[]
  pagination: {
    rowCount: number
    pageCount: number
    page: number
    pageSize: number
  }
}
