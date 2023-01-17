import request from 'graphql-request'
import { OTTERSPACE_CONFIG } from '@/lib/otterspace/config'
import { GET_USER_BADGES, GET_USER_RAFTS } from '@/lib/otterspace/queries'

export const getUserBadges = async (address: string, chainId: 5 | 10) =>
  request(OTTERSPACE_CONFIG[chainId].url, GET_USER_BADGES, { owner: address })

export const getUserRafts = async (address: string, chainId: 5 | 10) =>
  request(OTTERSPACE_CONFIG[chainId].url, GET_USER_RAFTS, { owner: address })
