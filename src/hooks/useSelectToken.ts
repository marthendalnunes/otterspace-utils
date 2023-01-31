import { useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

interface IToken {
  tokenId: string
  name: string
  image: string
}

export const useSelectToken = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedToken, setSelectedToken] = useState<IToken>({
    tokenId: '',
    name: '',
    image: ''
  })
  const { address } = useAccount()
  const { chain } = useNetwork()

  const handleClick = (tokenId: string, name: string, image: string) => {
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
    chain,
    selectedToken,
    isOpen,
    handleClick,
    handleClose
  }
}
