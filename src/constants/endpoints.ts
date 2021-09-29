/** Endpoints constants */

const { hostname } = window.location

export const IS_CLOUD = hostname.indexOf('.cloud.apisuite.io') >= 0

/**
 * For when running in the cloud environment.
 * Given the current Portal hostname, get the corresponding domain for another
 * service running in a given subdomain prefix.
 * Ex: ${client}.cloud.apisuite.io -> ${client}-${subdomainSuffx}.cloud.apisuite.io
 *
 * @param subdomainSuffix
 */
export function getCloudUrlForSubdomainSuffix(subdomainSuffix: string) {
  if (IS_CLOUD) {
    const apiHostname = hostname.replace('.', `-${subdomainSuffix}.`)
    return `https://${apiHostname}`
  }

  return null
}

function getApiUrl() {
  /* If we happen to be on a CLOUD environment, we point to its corresponding API by converting the portal's CLOUD
  hostname into the one for our core's CLOUD API. We achieve this by replacing the first dot in our portal's
  hostname with '-apisuite-api.', which essentially turns `${client}.cloud.apisuite.io` into
  `${client}-apisuite-api.cloud.apisuite.io`.
  
  If we happen to be on a non - CLOUD environment, we use that environment's (e.g., Development,
  Staging, or Production) variable for the core's API. */
  if (IS_CLOUD) {
    const apiHostname = hostname.replace('.', '-apisuite-api.')
    return `https://${apiHostname}`
  }

  return process.env.API_URL || ''
}

function getMarketplaceApiUrl() {
  if (IS_CLOUD) {
    const apiHostname = hostname.replace('.', '-marketplace-api.')
    return `https://${apiHostname}`
  }

  return process.env.MARKETPLACE_API_URL || ''
}

export const API_URL = getApiUrl()
export const MARKETPLACE_API_URL = getMarketplaceApiUrl()
export const INFORM_URL = process.env.INFORM_URL || ''
