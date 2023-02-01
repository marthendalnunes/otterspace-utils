import request from 'graphql-request'
import { getOtterspaceConfig } from '@/lib/otterspace/config'
import {
  GET_USER_BADGES,
  GET_USER_RAFTS,
  GET_RAFT_BADGE_SPECS,
  GET_BADGE_SPEC_BADGES
} from '@/lib/otterspace/queries'

export const getUserBadges = async (address?: string, chainId?: number) =>
  request(getOtterspaceConfig(chainId).url, GET_USER_BADGES, {
    owner: address
  })

export const getUserRafts = async (address?: string, chainId?: number) =>
  request(getOtterspaceConfig(chainId).url, GET_USER_RAFTS, {
    owner: address
  })

export const getRaftBadges = async (id: string, chainId?: number) =>
  request(getOtterspaceConfig(chainId).url, GET_RAFT_BADGE_SPECS, {
    id: `rafts:${id}`
  })

export const getBadgeSpecBadges = async (id: string, chainId?: number) =>
  request(getOtterspaceConfig(chainId).url, GET_BADGE_SPEC_BADGES, {
    id
  })
