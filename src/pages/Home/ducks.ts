import update from 'immutability-helper'
import { CatalogAppDetails } from '../../components/AppCatalog/types'

import {
  AppDetails,
  Filters,
  MarketplaceActions,
  MarketplacePublisher,
  MarketplaceStore,
  Pagination,
  PublisherDetails,
  SubbedMarketplaceApp,
  View,
} from './types'

/** Initial state */

const initialState: MarketplaceStore = {
  // 'Marketplace' view
  allMarketplaceApps: [],
  allMarketplaceLabels: [],
  allMarketplacePublishers: [],

  filteredMarketplaceApps: [],

  retrievedAllMarketplaceApps: false,
  retrievedAllMarketplaceLabels: false,
  retrievedAllMarketplacePublishers: false,

  pagination: {
    page: 1,
    pageCount: 0,
    pageSize: 1,
    rowCount: 0,
  },

  // 'App details' view
  selectedAppDetails: {
    createdAt: '',
    description: '',
    directUrl: '',
    id: 0,
    images: [],
    labels: [],
    logo: '',
    name: '',
    organization: {
      id: '',
      name: '',
      privacyUrl: '',
      supportUrl: '',
      tosUrl: '',
    },
    orgId: 0,
    privacyUrl: '',
    shortDescription: '',
    supportUrl: '',
    tosUrl: '',
    updatedAt: '',
    websiteUrl: '',
    youtubeUrl: '',
  },
  retrievedSelectedAppDetails: false,

  allSubbedMarketplaceApps: [],
  retrievedAllSubbedMarketplaceApps: false,

  publisherAppsSample: [],
  retrievedPublisherAppsSample: false,

  // 'Publisher details' view
  publisherDetails: {
    description: '',
    id: '',
    logo: '',
    name: '',
    privacyUrl: '',
    supportUrl: '',
    tosUrl: '',
    vat: '',
    websiteUrl: '',
    youtubeUrl: '',
  },
  retrievedPublisherDetails: false,
  retrievedPublisherDetailsError: false,

  allPublisherApps: [],
  retrievedAllPublisherApps: false,

  // 'App creating/editing' views
  marketplaceAppLabels: [],
  marketplaceAppVisibility: 'private',
}

/** Action types */

// 'Marketplace' view
export const GET_ALL_MARKETPLACE_APPS_ACTION =
  'Marketplace/GET_ALL_MARKETPLACE_APPS_ACTION'
export const GET_ALL_MARKETPLACE_APPS_ACTION_SUCCESS =
  'Marketplace/GET_ALL_MARKETPLACE_APPS_ACTION_SUCCESS'

export const GET_ALL_MARKETPLACE_LABELS_ACTION =
  'Marketplace/GET_ALL_MARKETPLACE_LABELS_ACTION'
export const GET_ALL_MARKETPLACE_LABELS_ACTION_SUCCESS =
  'Marketplace/GET_ALL_MARKETPLACE_LABELS_ACTION_SUCCESS'

export const GET_ALL_MARKETPLACE_PUBLISHERS_ACTION =
  'Marketplace/GET_ALL_MARKETPLACE_PUBLISHERS_ACTION'
export const GET_ALL_MARKETPLACE_PUBLISHERS_ACTION_SUCCESS =
  'Marketplace/GET_ALL_MARKETPLACE_PUBLISHERS_ACTION_SUCCESS'

export const GET_FILTERED_MARKETPLACE_APPS_ACTION =
  'Marketplace/GET_FILTERED_MARKETPLACE_APPS_ACTION'
export const GET_FILTERED_MARKETPLACE_APPS_ACTION_SUCCESS =
  'Marketplace/GET_FILTERED_MARKETPLACE_APPS_ACTION_SUCCESS'

// 'App details' view
export const GET_APP_DETAILS_ACTION = 'Marketplace/GET_APP_DETAILS_ACTION'
export const GET_APP_DETAILS_ACTION_SUCCESS =
  'Marketplace/GET_APP_DETAILS_ACTION_SUCCESS'

export const GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION =
  'Marketplace/GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION'
export const GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_SUCCESS =
  'Marketplace/GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_SUCCESS'
export const GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_ERROR =
  'Marketplace/GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_ERROR'

export const SUBSCRIBE_TO_MARKETPLACE_APP_ACTION =
  'Marketplace/SUBSCRIBE_TO_MARKETPLACE_APP_ACTION'
export const SUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS =
  'Marketplace/SUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS'

export const UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION =
  'Marketplace/UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION'
export const UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS =
  'Marketplace/UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS'

export const GET_PUBLISHER_APPS_SAMPLE_ACTION =
  'Marketplace/GET_PUBLISHER_APPS_SAMPLE_ACTION'
export const GET_PUBLISHER_APPS_SAMPLE_ACTION_SUCCESS =
  'Marketplace/GET_PUBLISHER_APPS_SAMPLE_ACTION_SUCCESS'

// 'Publisher details' view
export const GET_PUBLISHER_DETAILS_ACTION =
  'Marketplace/GET_PUBLISHER_DETAILS_ACTION'
export const GET_PUBLISHER_DETAILS_ACTION_SUCCESS =
  'Marketplace/GET_PUBLISHER_DETAILS_ACTION_SUCCESS'
export const GET_PUBLISHER_DETAILS_ACTION_ERROR =
  'Marketplace/GET_PUBLISHER_DETAILS_ACTION_ERROR'

// 'App creating/editing' views

export const SET_MARKETPLACE_APP_LABELS_ACTION =
  'Marketplace/SET_MARKETPLACE_APP_LABELS_ACTION'

export const SET_MARKETPLACE_APP_VISIBILITY_ACTION =
  'Marketplace/SET_MARKETPLACE_APP_VISIBILITY_ACTION'

/** Reducer */

export default function reducer(
  state = initialState,
  action: MarketplaceActions
): MarketplaceStore {
  switch (action.type) {
    // 'Marketplace' view
    case GET_ALL_MARKETPLACE_APPS_ACTION: {
      return state
    }

    case GET_ALL_MARKETPLACE_APPS_ACTION_SUCCESS: {
      return update(state, {
        allMarketplaceApps: { $set: action.allMarketplaceApps },
        retrievedAllMarketplaceApps: { $set: true },
      })
    }

    case GET_ALL_MARKETPLACE_LABELS_ACTION: {
      return state
    }

    case GET_ALL_MARKETPLACE_LABELS_ACTION_SUCCESS: {
      return update(state, {
        allMarketplaceLabels: { $set: action.allMarketplaceLabels },
        retrievedAllMarketplaceLabels: { $set: true },
      })
    }

    case GET_ALL_MARKETPLACE_PUBLISHERS_ACTION: {
      return state
    }

    case GET_ALL_MARKETPLACE_PUBLISHERS_ACTION_SUCCESS: {
      return update(state, {
        allMarketplacePublishers: { $set: action.allMarketplacePublishers },
        retrievedAllMarketplacePublishers: { $set: true },
      })
    }

    case GET_FILTERED_MARKETPLACE_APPS_ACTION: {
      if (action.view === 'marketplace') {
        return state
      } else {
        return update(state, {
          retrievedAllPublisherApps: { $set: false },
        })
      }
    }

    case GET_FILTERED_MARKETPLACE_APPS_ACTION_SUCCESS: {
      return update(state, {
        filteredMarketplaceApps: { $set: action.filteredMarketplaceApps },
        pagination: { $set: action.pagination },
      })
    }

    // 'App details' view
    case GET_APP_DETAILS_ACTION: {
      return update(state, {
        retrievedSelectedAppDetails: { $set: false },
      })
    }

    case GET_APP_DETAILS_ACTION_SUCCESS: {
      return update(state, {
        selectedAppDetails: { $set: action.appDetails },
        retrievedSelectedAppDetails: { $set: true },
      })
    }

    case GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION: {
      return state
    }

    case GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_SUCCESS: {
      return update(state, {
        allSubbedMarketplaceApps: { $set: action.allSubbedMarketplaceApps },
        retrievedAllSubbedMarketplaceApps: { $set: true },
      })
    }

    case GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_ERROR: {
      return update(state, {
        retrievedAllSubbedMarketplaceApps: { $set: true },
      })
    }

    case SUBSCRIBE_TO_MARKETPLACE_APP_ACTION:
    case SUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS: {
      return state
    }

    case UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION:
    case UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS: {
      return state
    }

    case GET_PUBLISHER_APPS_SAMPLE_ACTION: {
      return update(state, {
        retrievedPublisherAppsSample: { $set: false },
      })
    }

    case GET_PUBLISHER_APPS_SAMPLE_ACTION_SUCCESS: {
      return update(state, {
        publisherAppsSample: { $set: action.publisherAppsSample },
        retrievedPublisherAppsSample: { $set: true },
      })
    }

    // 'Publisher details' view
    case GET_PUBLISHER_DETAILS_ACTION: {
      return update(state, {
        retrievedPublisherDetails: { $set: false },
      })
    }

    case GET_PUBLISHER_DETAILS_ACTION_SUCCESS: {
      return update(state, {
        publisherDetails: { $set: action.publisherDetails },
        retrievedPublisherDetails: { $set: true },
        retrievedPublisherDetailsError: { $set: false },
      })
    }

    case GET_PUBLISHER_DETAILS_ACTION_ERROR: {
      return update(state, {
        retrievedPublisherDetails: { $set: false },
        retrievedPublisherDetailsError: { $set: true },
      })
    }

    // 'App creating/editing' views
    case SET_MARKETPLACE_APP_LABELS_ACTION: {
      return update(state, {
        marketplaceAppLabels: { $set: action.marketplaceAppLabels },
      })
    }

    case SET_MARKETPLACE_APP_VISIBILITY_ACTION: {
      return update(state, {
        marketplaceAppVisibility: { $set: action.marketplaceAppVisibility },
      })
    }

    default:
      return state
  }
}

/** Action builders */

// 'Marketplace' view
export function getAllMarketplaceAppsAction(pagination: {
  page: number
  pageSize: number
}) {
  return { type: GET_ALL_MARKETPLACE_APPS_ACTION, pagination }
}

export function getAllMarketplaceAppsActionSuccess(
  allMarketplaceApps: CatalogAppDetails[]
) {
  return { type: GET_ALL_MARKETPLACE_APPS_ACTION_SUCCESS, allMarketplaceApps }
}

export function getAllMarketplaceLabelsAction() {
  return { type: GET_ALL_MARKETPLACE_LABELS_ACTION }
}

export function getAllMarketplaceLabelsActionSuccess(
  allMarketplaceLabels: string[]
) {
  return {
    type: GET_ALL_MARKETPLACE_LABELS_ACTION_SUCCESS,
    allMarketplaceLabels,
  }
}

export function getAllMarketplacePublishersAction() {
  return { type: GET_ALL_MARKETPLACE_PUBLISHERS_ACTION }
}

export function getAllMarketplacePublishersActionSuccess(
  allMarketplacePublishers: MarketplacePublisher[]
) {
  return {
    type: GET_ALL_MARKETPLACE_PUBLISHERS_ACTION_SUCCESS,
    allMarketplacePublishers,
  }
}

export function getFilteredMarketplaceAppsAction(filters: Filters, view: View) {
  return {
    type: GET_FILTERED_MARKETPLACE_APPS_ACTION,
    filters,
    view,
  }
}

export function getFilteredMarketplaceAppsActionSuccess(payload: {
  filteredMarketplaceApps: CatalogAppDetails[]
  pagination: Pagination
  view: View
}) {
  return {
    type: GET_FILTERED_MARKETPLACE_APPS_ACTION_SUCCESS,
    ...payload,
  }
}

// 'App details' view
export function getAppDetailsAction(appID: string) {
  return { type: GET_APP_DETAILS_ACTION, appID }
}

export function getAppDetailsActionSuccess(appDetails: AppDetails) {
  return { type: GET_APP_DETAILS_ACTION_SUCCESS, appDetails }
}

export function subscribeToMarketplaceAppAction(userID: number, appID: number) {
  return {
    type: SUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
    userID,
    appID,
  }
}

export function subscribeToMarketplaceAppActionSuccess() {
  return {
    type: SUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS,
  }
}

export function unsubscribeToMarketplaceAppAction(
  userID: number,
  appID: number
) {
  return {
    type: UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
    userID,
    appID,
  }
}

export function unsubscribeToMarketplaceAppActionSuccess() {
  return {
    type: UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION_SUCCESS,
  }
}

export function getAllSubbedMarketplaceAppsAction(userID: number) {
  return {
    type: GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION,
    userID,
  }
}

export function getAllSubbedMarketplaceAppsActionSuccess(
  allSubbedMarketplaceApps: SubbedMarketplaceApp[]
) {
  return {
    type: GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_SUCCESS,
    allSubbedMarketplaceApps,
  }
}

export function getAllSubbedMarketplaceAppsActionError() {
  return {
    type: GET_ALL_SUBBED_MARKETPLACE_APPS_ACTION_ERROR,
  }
}

export function getPublisherAppsSampleAction(orgID: number, appID: number) {
  return {
    type: GET_PUBLISHER_APPS_SAMPLE_ACTION,
    orgID,
    appID,
  }
}

export function getPublisherAppsSampleActionSuccess(payload: {
  publisherAppsSample: AppDetails[]
}) {
  return {
    type: GET_PUBLISHER_APPS_SAMPLE_ACTION_SUCCESS,
    ...payload,
  }
}

// 'Publisher details' view
export function getPublisherDetailsAction(publisherID: string) {
  return { type: GET_PUBLISHER_DETAILS_ACTION, publisherID }
}

export function getPublisherDetailsActionSuccess(
  publisherDetails: PublisherDetails
) {
  return { type: GET_PUBLISHER_DETAILS_ACTION_SUCCESS, publisherDetails }
}

export function getPublisherDetailsActionError() {
  return { type: GET_PUBLISHER_DETAILS_ACTION_ERROR }
}

// 'App creating/editing' views
export function setMarketplaceAppLabelsAction(marketplaceAppLabels: string[]) {
  return {
    type: SET_MARKETPLACE_APP_LABELS_ACTION,
    marketplaceAppLabels,
  }
}

export function setMarketplaceAppVisibilityAction(
  marketplaceAppVisibility: string
) {
  return {
    type: SET_MARKETPLACE_APP_VISIBILITY_ACTION,
    marketplaceAppVisibility,
  }
}
