export type IBadgeStatus = 'BURNED' | 'MINTED' | 'REINSTATED' | 'REVOKED'
export interface IBadgeSpecMetadata {
  image: string
  name: string
}

export interface IBadgeSpec {
  id: string
  metadata: IBadgeSpecMetadata
}

export interface IBadge {
  from: string
  id: string
  status: IBadgeStatus
  owner: string
  spec: IBadgeSpec
  metadata: IBadgeSpecMetadata
}
