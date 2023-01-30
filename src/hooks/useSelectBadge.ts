import { useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { getUserBadges } from '@/lib/otterspace/client'

interface IToken {
  tokenId: string
  name: string
  image: string
}

export const useSelectBadge = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedToken, setSelectedToken] = useState<IToken>({
    tokenId: '',
    name: '',
    image: ''
  })
  const { address } = useAccount()
  const { chain } = useNetwork()

  const badgesQuery = useQuery({
    queryKey: ['user-badges', address || '', chain?.id],
    queryFn: async () => getUserBadges(address, chain?.id)
  })

  const handleClickBadge = (tokenId: string, name: string, image: string) => {
    setIsOpen(true)
    setSelectedToken({
      tokenId,
      image,
      name
    })
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedToken({
      tokenId: '',
      name: '',
      image: ''
    })
  }

  return {
    address,
    badgesQuery,
    selectedToken,
    isOpen,
    handleClickBadge,
    handleClose
  }
}
