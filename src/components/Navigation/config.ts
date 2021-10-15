import { DefaultConfig } from "@apisuite/fe-base";
import { PORTAL_URL } from "../../constants/endpoints";

export const navigation: Partial<DefaultConfig["navigation"]> = {
  anonymous: {
    tabs: [
      {
        fixed: false,
        label: {
          type: "text",
          fallback: "Marketplace",
        },
        action: "/",
        subTabs: [
          {
            fixed: false,
            label: {
              type: "text",
              fallback: "",
            },
            action: "/app-details/:id",
            backAction: {
              route: "/",
              fallback: "Go back",
              iconName: "navigate_before",
            },
          },
          {
            fixed: false,
            label: {
              type: "text",
              fallback: "",
            },
            action: "/publisher-details/:id",
            backAction: {
              route: "/",
              fallback: "Go back",
              iconName: "navigate_before",
            },
          },
        ],
      },
      {
        fixed: false,
        label: {
          type: "text",
          fallback: "API Products",
        },
        action: `${PORTAL_URL}/api-products`,
      },
      {
        fixed: false,
        label: {
          type: "text",
          fallback: "Documentation",
        },
        action: `${PORTAL_URL}/documentation`,
      },
      {
        fixed: false,
        label: {
          type: "text",
          fallback: "Support",
        },
        action: "https://intercom.help/api-suite/en",
      },
      {
        fixed: true,
        label: {
          type: "text",
          fallback: "Sign up",
        },
        action: `${PORTAL_URL}/auth/signup`,
      },
      {
        fixed: true,
        label: {
          type: "text",
          fallback: "Sign in",
        },
        action: `${PORTAL_URL}/auth/signin`,
      },
    ],
    events: {
      afterLogin: "/",
    },
  },
  title: {
    route: "/",
    iconFallbackName: "view_carousel",
  },
};
