import { i18n } from "@apisuite/fe-base";
import { AppDetails } from "../pages/Home/types";

export default function appDetailsMapping(appDetails: AppDetails) {
  return {
    id: appDetails.id,
    labels: appDetails.labels,
    logo: appDetails.logo,
    name: appDetails.name,
    publisher: appDetails.organization.name,
    summary: appDetails.shortDescription || i18n.t("extensions.marketplace.appMarketplace.noSummaryAvailableText"),
  };
}
