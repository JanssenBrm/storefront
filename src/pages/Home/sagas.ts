import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ALL_MARKETPLACE_APPS_ACTION,
  GET_ALL_MARKETPLACE_LABELS_ACTION,
  GET_ALL_MARKETPLACE_PUBLISHERS_ACTION,
  GET_APP_DETAILS_ACTION,
  GET_FILTERED_MARKETPLACE_APPS_ACTION,
  getAllMarketplaceAppsActionSuccess,
  getAllMarketplaceLabelsActionSuccess,
  getAllMarketplacePublishersActionSuccess,
  getAppDetailsActionSuccess,
  getFilteredMarketplaceAppsActionSuccess,
  SUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
  subscribeToMarketplaceAppActionSuccess,
  UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
  unsubscribeToMarketplaceAppActionSuccess,
} from './ducks'

import {
  AppDetails,
  GetAllMarketplaceAppsAction,
  GetAppDetailsAction,
  GetFilteredAppsMarketplaceAction,
  MarketplaceAppsResponse,
  SubscribeToMarketplaceAppAction,
  UnsubscribeToMarketplaceAppAction,
} from './types'

import { API_URL, MARKETPLACE_API_URL } from '../../constants/endpoints'
import appDetailsMapping from '../../utils/appDetailsMapping'
import request from '../../utils/request'
import { CatalogAppDetails } from '../../components/AppCatalog/types'

export function* getAllMarketplaceAppsActionSaga(
  action: GetAllMarketplaceAppsAction
) {
  try {
    const getAllMarketplaceAppsActionUrl = `${API_URL}/apps/public?page=${action.pagination.page}&pageSize=${action.pagination.pageSize}&sort_by=app&order=asc`

    const response: MarketplaceAppsResponse = yield call(request, {
      url: getAllMarketplaceAppsActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    const allMarketplaceApps: CatalogAppDetails[] = response.rows.map((app) => {
      return appDetailsMapping(app)
    })

    yield put(getAllMarketplaceAppsActionSuccess(allMarketplaceApps))
  } catch (error) {
    console.log('Error fetching all marketplace apps', error)
  }
}

export function* getAllMarketplaceLabelsActionSaga() {
  try {
    const getAllMarketplaceLabelsActionUrl = `${API_URL}/apps/public/labels`

    const response: string[] = yield call(request, {
      url: getAllMarketplaceLabelsActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    yield put(getAllMarketplaceLabelsActionSuccess(response))
  } catch (error) {
    console.log("Error fetching all marketplace apps' labels")
  }
}

export function* getAllMarketplacePublishersActionSaga() {
  try {
    const getAllMarketplacePublishersActionUrl = `${API_URL}/organizations/publishers`

    const response: { id: number; name: string }[] = yield call(request, {
      url: getAllMarketplacePublishersActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    yield put(getAllMarketplacePublishersActionSuccess(response))
  } catch (error) {
    console.log("Error fetching all marketplace apps' publishers")
  }
}

export function* subscribeToMarketplaceAppActionSaga(
  action: SubscribeToMarketplaceAppAction
) {
  try {
    const subscribeToMarketplaceAppActionUrl = `${MARKETPLACE_API_URL}/users/${action.userID}/subscriptions/${action.appID}`

    yield call(request, {
      url: subscribeToMarketplaceAppActionUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    yield put(subscribeToMarketplaceAppActionSuccess())
  } catch (error) {
    console.log('Error subscribing')
  }
}

export function* unsubscribeToMarketplaceAppActionSaga(
  action: UnsubscribeToMarketplaceAppAction
) {
  try {
    const unsubscribeToMarketplaceAppActionUrl = `${MARKETPLACE_API_URL}/users/${action.userID}/subscriptions/${action.appID}`

    yield call(request, {
      url: unsubscribeToMarketplaceAppActionUrl,
      method: 'DELETE',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    yield put(unsubscribeToMarketplaceAppActionSuccess())
  } catch (error) {
    console.log('Error unsubscribing')
  }
}

export function* getFilteredMarketplaceAppsActionSaga(
  action: GetFilteredAppsMarketplaceAction
) {
  try {
    let getFilteredMarketplaceAppsActionUrl = `${API_URL}/apps/public`

    let orgIDParameters = ''
    let labelParameters = ''
    let sortModeParameters = ''
    let orderModeParameters = ''

    if (action.filters.org_id.length !== 0) {
      action.filters.org_id.map((orgID, index) => {
        if (index === 0) {
          orgIDParameters = orgIDParameters + `?org_id=${orgID}`
        } else {
          orgIDParameters = orgIDParameters + `&org_id=${orgID}`
        }
      })
    }

    if (action.filters.label.length !== 0) {
      action.filters.label.map((label, index) => {
        if (index === 0 && orgIDParameters.length === 0) {
          labelParameters = labelParameters + `?label=${label}`
        } else {
          labelParameters = labelParameters + `&label=${label}`
        }
      })
    }

    if (orgIDParameters.length === 0 && labelParameters.length === 0) {
      sortModeParameters =
        sortModeParameters + `?sort_by=${action.filters.sort_by}`
    } else {
      sortModeParameters =
        sortModeParameters + `&sort_by=${action.filters.sort_by}`
    }

    if (
      orgIDParameters.length === 0 &&
      labelParameters.length === 0 &&
      sortModeParameters.length === 0
    ) {
      orderModeParameters =
        orderModeParameters + `?order=${action.filters.order}`
    } else {
      orderModeParameters =
        orderModeParameters + `&order=${action.filters.order}`
    }

    let prefix =
      orgIDParameters.length === 0 &&
      labelParameters.length === 0 &&
      sortModeParameters.length === 0
        ? '?'
        : '&'
    const pagination = `${prefix}page=${action.filters.page}&pageSize=${action.filters.pageSize}`

    prefix =
      orgIDParameters.length === 0 &&
      labelParameters.length === 0 &&
      sortModeParameters.length === 0 &&
      pagination.length === 0
        ? '?'
        : '&'
    const search = action.filters.search.length
      ? `${prefix}search=${action.filters.search}`
      : ''

    getFilteredMarketplaceAppsActionUrl =
      getFilteredMarketplaceAppsActionUrl +
      orgIDParameters +
      labelParameters +
      sortModeParameters +
      orderModeParameters +
      pagination +
      search

    const response: MarketplaceAppsResponse = yield call(request, {
      url: getFilteredMarketplaceAppsActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    const filteredMarketplaceApps: CatalogAppDetails[] = response.rows.map(
      (app) => {
        return appDetailsMapping(app)
      }
    )

    yield put(
      getFilteredMarketplaceAppsActionSuccess({
        filteredMarketplaceApps,
        pagination: response.pagination,
        view: action.view,
      })
    )
  } catch (error) {
    console.log('Error fetching filtered marketplace apps', error)
  }
}

export function* getAppDetailsActionSaga(action: GetAppDetailsAction) {
  try {
    const getAppDetailsActionUrl = `${API_URL}/apps/public/${action.appID}`

    const response: AppDetails = yield call(request, {
      url: getAppDetailsActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    yield put(getAppDetailsActionSuccess(response))
  } catch (error) {
    console.log("Error fetching the selected app's details")
  }
}

function* rootSaga() {
  yield takeLatest(
    GET_ALL_MARKETPLACE_APPS_ACTION,
    getAllMarketplaceAppsActionSaga
  )
  yield takeLatest(
    GET_ALL_MARKETPLACE_LABELS_ACTION,
    getAllMarketplaceLabelsActionSaga
  )
  yield takeLatest(
    GET_ALL_MARKETPLACE_PUBLISHERS_ACTION,
    getAllMarketplacePublishersActionSaga
  )
  yield takeLatest(
    SUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
    subscribeToMarketplaceAppActionSaga
  )
  yield takeLatest(
    UNSUBSCRIBE_TO_MARKETPLACE_APP_ACTION,
    unsubscribeToMarketplaceAppActionSaga
  )
  yield takeLatest(
    GET_FILTERED_MARKETPLACE_APPS_ACTION,
    getFilteredMarketplaceAppsActionSaga
  )
  yield takeLatest(GET_APP_DETAILS_ACTION, getAppDetailsActionSaga)
}

export default rootSaga
