import { State as MarketplaceState, Events as MarketplaceEvents } from "./marketplace/types";
import { State as StorefrontState, Events as StorefrontEvents } from "./storefront/types";

export type State = MarketplaceState & StorefrontState;
export type Events = MarketplaceEvents & StorefrontEvents;
