import { createSelector } from 'reselect'
import { MarketplaceStore } from './types'

const marketplaceSelector = createSelector(
  ({ marketplace }: any) => marketplace,
  (marketplace: MarketplaceStore) => {
    return {
      allMarketplaceApps: marketplace.allMarketplaceApps,
      allMarketplaceLabels: marketplace.allMarketplaceLabels,
      allMarketplacePublishers: marketplace.allMarketplacePublishers,

      filteredMarketplaceApps: marketplace.filteredMarketplaceApps,

      retrievedAllMarketplaceApps: marketplace.retrievedAllMarketplaceApps,
      retrievedAllMarketplaceLabels: marketplace.retrievedAllMarketplaceLabels,
      retrievedAllMarketplacePublishers:
        marketplace.retrievedAllMarketplacePublishers,
      pagination: marketplace.pagination,
    }
  }
)

export default marketplaceSelector
