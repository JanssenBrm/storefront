import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
import { storeonLogger } from "storeon/devtools";

import { marketplace } from "./marketplace";
import { storefront } from "./storefront";

import { Events, State } from "./types";

export const store = createStoreon<State, Events>([
  process.env.NODE_ENV !== "production" && storeonDevtools,
  process.env.NODE_ENV !== "production" && storeonLogger,
  marketplace,
  storefront,
]);
