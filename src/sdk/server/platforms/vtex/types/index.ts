export interface Options {
  baseURl: string
  hideUnavailableItems?: string
  flags?: FeatureFlags
}

interface FeatureFlags {
  enableOrderFormSync?: boolean
}

export interface StoreOptions {
  salesChannel: string
  regionId: string
  seller: string
}
