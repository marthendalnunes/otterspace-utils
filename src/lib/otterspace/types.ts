export type IBadgeStatus = 'BURNED' | 'MINTED' | 'REINSTATED' | 'REVOKED'
export interface IBadgeSpecMetadata {
  image: string
  name: string
  description: string
}

export interface IBadgeSpec {
  id: string
  uri: string
  metadata: IBadgeSpecMetadata
}

export interface IBadge {
  from: string
  id: string
  status: IBadgeStatus
  spec: IBadgeSpec
  metadata: IBadgeSpecMetadata
}
