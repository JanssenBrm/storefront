import { StoreonStore } from "storeon";
import {
  MarketplaceAppsResponse,
  GET_DATA,
  GET_ALL_MARKETPLACE_APPS,
  GET_ALL_MARKETPLACE_LABELS,
  GET_ALL_MARKETPLACE_PUBLISHERS,
  GET_APP_DETAILS,
  GET_FILTERED_MARKETPLACE_APPS,
  GET_PUBLISHER_APPS_SAMPLE,
  MARKETPLACE_ERRORS_CLEAR,
  MARKETPLACE_ERRORS_SET,
  SAVE_ALL_FILTERED_MARKETPLACE_APPS,
  SAVE_ALL_MARKETPLACE_APPS,
  SAVE_ALL_MARKETPLACE_LABELS,
  SAVE_ALL_MARKETPLACE_PUBLISHERS,
  SAVE_APP_DETAILS,
  SAVE_PUBLISHER_APP_SAMPLE,
} from "./types";
import { State, Events } from "../types";
import { API_URL } from "../../constants/endpoints";
import { CatalogAppDetails } from "../../components/AppCatalog/types";
import request, { ErrorReason } from "../../utils/request";
import appDetailsMapping from "../../utils/appDetailsMapping";
import { AppDetails } from "../../pages/Home/types";

export const marketplace = (store: StoreonStore<State, Events>) => {
  store.on("@init", () => ({
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
      createdAt: "",
      description: "",
      directUrl: "",
      id: 0,
      images: [],
      labels: [],
      logo: "",
      name: "",
      organization: {
        id: "",
        name: "",
        privacyUrl: "",
        supportUrl: "",
        tosUrl: "",
      },
      orgId: 0,
      privacyUrl: "",
      shortDescription: "",
      supportUrl: "",
      tosUrl: "",
      updatedAt: "",
      websiteUrl: "",
      youtubeUrl: "",
    },
    retrievedSelectedAppDetails: false,

    publisherAppsSample: [],
    retrievedPublisherAppsSample: false,

    view: "marketplace",

    error: undefined,
  }));

  store.on(GET_DATA, (_, type) => {
    switch (type) {
      case GET_ALL_MARKETPLACE_APPS:
        return { retrievedAllMarketplaceApps: false };
      case GET_ALL_MARKETPLACE_LABELS:
        return { retrievedAllMarketplaceLabels: false };
      case GET_ALL_MARKETPLACE_PUBLISHERS:
        return { retrievedAllMarketplacePublishers: false };
      case GET_APP_DETAILS:
        return { retrievedSelectedAppDetails: false };
      case GET_PUBLISHER_APPS_SAMPLE:
        return { retrievedPublisherAppsSample: false };
    }
  });

  store.on(SAVE_ALL_MARKETPLACE_APPS, (_, apps) => {
    return { allMarketplaceApps: apps, retrievedAllMarketplaceApps: true };
  });

  store.on(SAVE_ALL_MARKETPLACE_LABELS, (_, labels) => {
    return { allMarketplaceLabels: labels, retrievedAllMarketplaceLabels: true };
  });

  store.on(SAVE_ALL_MARKETPLACE_PUBLISHERS, (_, publishers) => {
    return { allMarketplacePublishers: publishers, retrievedAllMarketplacePublishers: true };
  });

  store.on(SAVE_ALL_FILTERED_MARKETPLACE_APPS, (_, apps) => {
    return { filteredMarketplaceApps: apps.filteredMarketplaceApps, pagination: apps.pagination, view: apps.view };
  });

  store.on(SAVE_PUBLISHER_APP_SAMPLE, (_, sample) => {
    return { publisherAppsSample: sample, retrievedPublisherAppsSample: true };
  });

  store.on(SAVE_APP_DETAILS, (_, app) => {
    return { selectedAppDetails: app, retrievedSelectedAppDetails: true };
  });

  store.on(MARKETPLACE_ERRORS_CLEAR, (state) => {
    return { ...state, error: undefined };
  });

  store.on(MARKETPLACE_ERRORS_SET, (state, error) => {
    return { ...state, error };
  });

  store.on(GET_ALL_MARKETPLACE_APPS, async (_, pagination) => {
    store.dispatch(MARKETPLACE_ERRORS_CLEAR);
    store.dispatch(GET_DATA, GET_ALL_MARKETPLACE_APPS);
    try {
      const getAllMarketplaceAppsActionUrl = `${API_URL}/apps/public?page=${pagination.page}&pageSize=${pagination.pageSize}&sort_by=app&order=asc`;

      const response: MarketplaceAppsResponse = await request({
        url: getAllMarketplaceAppsActionUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      const allMarketplaceApps: CatalogAppDetails[] = response.rows.map((app) => {
        return appDetailsMapping(app);
      });
      store.dispatch(SAVE_ALL_MARKETPLACE_APPS, allMarketplaceApps);
    } catch (e) {
      store.dispatch(MARKETPLACE_ERRORS_SET, e as ErrorReason);
    }
  });

  store.on(GET_ALL_MARKETPLACE_LABELS, async () => {
    store.dispatch(MARKETPLACE_ERRORS_CLEAR);
    store.dispatch(GET_DATA, GET_ALL_MARKETPLACE_LABELS);
    try {
      const marketplaceLabelsUrl = `${API_URL}/apps/public/labels`;

      const response: string[] = await request({
        url: marketplaceLabelsUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      store.dispatch(SAVE_ALL_MARKETPLACE_LABELS, response);
    } catch (e) {
      store.dispatch(MARKETPLACE_ERRORS_SET, e as ErrorReason);
    }
  });

  store.on(GET_ALL_MARKETPLACE_PUBLISHERS, async () => {
    store.dispatch(MARKETPLACE_ERRORS_CLEAR);
    store.dispatch(GET_DATA, GET_ALL_MARKETPLACE_PUBLISHERS);
    try {
      const marketplacePublishersUrl = `${API_URL}/organizations/publishers`;

      const response: { id: number; name: string }[] = await request({
        url: marketplacePublishersUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      store.dispatch(SAVE_ALL_MARKETPLACE_PUBLISHERS, response);
    } catch (e) {
      store.dispatch(MARKETPLACE_ERRORS_SET, e as ErrorReason);
    }
  });

  store.on(GET_FILTERED_MARKETPLACE_APPS, async (_, action) => {
    store.dispatch(MARKETPLACE_ERRORS_CLEAR);
    try {
      let getFilteredMarketplaceAppsActionUrl = `${API_URL}/apps/public`;

      let orgIDParameters = "";
      let labelParameters = "";
      let sortModeParameters = "";
      let orderModeParameters = "";

      if (action.filters.org_id.length !== 0) {
        action.filters.org_id.map((orgID, index) => {
          if (index === 0) {
            orgIDParameters = orgIDParameters + `?org_id=${orgID}`;
          } else {
            orgIDParameters = orgIDParameters + `&org_id=${orgID}`;
          }
        });
      }

      if (action.filters.label.length !== 0) {
        action.filters.label.map((label, index) => {
          if (index === 0 && orgIDParameters.length === 0) {
            labelParameters = labelParameters + `?label=${label}`;
          } else {
            labelParameters = labelParameters + `&label=${label}`;
          }
        });
      }

      if (orgIDParameters.length === 0 && labelParameters.length === 0) {
        sortModeParameters = sortModeParameters + `?sort_by=${action.filters.sort_by}`;
      } else {
        sortModeParameters = sortModeParameters + `&sort_by=${action.filters.sort_by}`;
      }

      if (orgIDParameters.length === 0 && labelParameters.length === 0 && sortModeParameters.length === 0) {
        orderModeParameters = orderModeParameters + `?order=${action.filters.order}`;
      } else {
        orderModeParameters = orderModeParameters + `&order=${action.filters.order}`;
      }

      let prefix =
        orgIDParameters.length === 0 && labelParameters.length === 0 && sortModeParameters.length === 0 ? "?" : "&";
      const pagination = `${prefix}page=${action.filters.page}&pageSize=${action.filters.pageSize}`;

      prefix =
        orgIDParameters.length === 0 &&
        labelParameters.length === 0 &&
        sortModeParameters.length === 0 &&
        pagination.length === 0
          ? "?"
          : "&";
      const search = action.filters.search.length ? `${prefix}search=${action.filters.search}` : "";

      getFilteredMarketplaceAppsActionUrl =
        getFilteredMarketplaceAppsActionUrl +
        orgIDParameters +
        labelParameters +
        sortModeParameters +
        orderModeParameters +
        pagination +
        search;

      const response: MarketplaceAppsResponse = await request({
        url: getFilteredMarketplaceAppsActionUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      const filteredMarketplaceApps: CatalogAppDetails[] = response.rows.map((app) => {
        return appDetailsMapping(app);
      });

      store.dispatch(SAVE_ALL_FILTERED_MARKETPLACE_APPS, {
        filteredMarketplaceApps,
        pagination: response.pagination,
        view: action.view,
      });
    } catch (e) {
      store.dispatch(MARKETPLACE_ERRORS_SET, e as ErrorReason);
    }
  });

  store.on(GET_PUBLISHER_APPS_SAMPLE, async (_, action) => {
    store.dispatch(MARKETPLACE_ERRORS_CLEAR);
    store.dispatch(GET_DATA, GET_PUBLISHER_APPS_SAMPLE);
    try {
      const getPublisherAppsSampleUrl = `${API_URL}/apps/public?org_id=${action.orgID}&sort_by=updated&order=desc&page=1&pageSize=4`;

      const response: { rows: AppDetails[] } = await request({
        url: getPublisherAppsSampleUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      const publisherAppsSample = response.rows
        .filter((app) => {
          return app.id !== action.appID;
        })
        .slice(0, 3)
        .map((app) => {
          return appDetailsMapping(app);
        });

      store.dispatch(SAVE_PUBLISHER_APP_SAMPLE, publisherAppsSample);
    } catch (e) {
      store.dispatch(MARKETPLACE_ERRORS_SET, e as ErrorReason);
    }
  });

  store.on(GET_APP_DETAILS, async (_, appID) => {
    store.dispatch(MARKETPLACE_ERRORS_CLEAR);
    store.dispatch(GET_DATA, GET_APP_DETAILS);
    try {
      const getAppDetailsActionUrl = `${API_URL}/apps/public/${appID}`;

      const response: AppDetails = await request({
        url: getAppDetailsActionUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      store.dispatch(SAVE_APP_DETAILS, response);
    } catch (e) {
      store.dispatch(MARKETPLACE_ERRORS_SET, e as ErrorReason);
    }
  });
};
