import request from 'graphql-request'
import { getOtterspaceConfig } from '@/lib/otterspace/config'
import { GET_USER_BADGES, GET_USER_RAFTS } from '@/lib/otterspace/queries'

export const getUserBadges = async (address?: string, chainId?: number) =>
  request(getOtterspaceConfig(chainId).url, GET_USER_BADGES, {
    owner: address
  })

export const getUserRafts = async (address?: string, chainId?: number) =>
  request(getOtterspaceConfig(chainId).url, GET_USER_RAFTS, {
    owner: address
  })
