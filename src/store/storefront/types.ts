import { DefaultConfig } from "@apisuite/fe-base";

export const GET_STOREFRONT_CONFIG = "Markeplace/GET_STOREFRONT_CONFIG";
export const SAVE_STOREFRONT_CONFIG = "Markeplace/SAVE_STOREFRONT_CONFIG";
export const SET_STOREFRONT_REQUESTED = "Marketplace/SET_STOREFRONT_REQUESTED";

export interface StorefrontResponse extends Partial<DefaultConfig> {
  storefrontHeaderBackgroundImg?: string;
  storefrontHeaderImg?: string;
  storefrontLogo?: string;
}

export interface State {
  storefrontConfig: StorefrontResponse;
  storefrontRequested: boolean;
}

export interface Events {
  [GET_STOREFRONT_CONFIG]: undefined;
  [SAVE_STOREFRONT_CONFIG]: State["storefrontConfig"];
  [SET_STOREFRONT_REQUESTED]: boolean;
}
