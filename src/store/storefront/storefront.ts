import { StoreonStore } from "storeon";
import { StorefrontResponse, GET_STOREFRONT_CONFIG, SAVE_STOREFRONT_CONFIG, SET_STOREFRONT_REQUESTED } from "./types";
import { State, Events } from "../types";
import { API_URL } from "../../constants/endpoints";
import { STOREFRONT_NAME } from "../../constants/globals";
import request from "../../utils/request";

export const storefront = (store: StoreonStore<State, Events>) => {
  store.on("@init", () => ({ storefrontConfig: undefined, storefrontRequested: false }));

  store.on(SAVE_STOREFRONT_CONFIG, (_, config) => {
    return { storefrontConfig: config };
  });

  store.on(SET_STOREFRONT_REQUESTED, (_, state) => {
    return { storefrontRequested: state };
  });

  store.on(GET_STOREFRONT_CONFIG, async () => {
    store.dispatch(SET_STOREFRONT_REQUESTED, false);
    try {
      const storefrontConfigURL = `${API_URL}/settings/storefronts/${STOREFRONT_NAME}`;

      const response: StorefrontResponse = await request({
        url: storefrontConfigURL,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      store.dispatch(SAVE_STOREFRONT_CONFIG, response);
      store.dispatch(SET_STOREFRONT_REQUESTED, true);
    } catch (e) {
      store.dispatch(SET_STOREFRONT_REQUESTED, true);
    }
  });
};
