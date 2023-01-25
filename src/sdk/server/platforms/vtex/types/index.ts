export interface Options {
  baseURl: string
  flags?: FeatureFlags
}

interface FeatureFlags {
  enableOrderFormSync?: boolean
}

export interface StoreOptions {
  salesChannel: string
  regionId: string
}
