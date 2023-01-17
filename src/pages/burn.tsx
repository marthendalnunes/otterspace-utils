import { useState } from 'react'
import Head from 'next/head'
import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import Badges from '@otterspace-xyz/contracts/out/Badges.sol/Badges.json' assert { type: 'json' }
import { getUserBadges } from '@/lib/otterspace/client'
import { BadgesView } from '@/components/BadgesView'
import { BurnDialog } from '@/components/dialogs/BurnDialog'
import { OTTERSPACE_CONFIG } from '@/lib/otterspace/config'

interface IToken {
  tokenId: string
  name: string
  image: string
}

export default function BurnPage() {
  const [selectedToken, setSelectedToken] = useState<IToken>({
    tokenId: '',
    name: '',
    image: ''
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId =
    chain?.id && (chain.id === 5 || chain.id === 10) ? chain.id : 5
  const {
    data: badgesData,
    isLoading: isLoadingFetchBadges,
    isSuccess
  } = useQuery({
    queryKey: ['user-badges', address, chainId],
    queryFn: async () => getUserBadges(address || '', chainId)
  })

  const { config } = usePrepareContractWrite({
    address: OTTERSPACE_CONFIG[chainId].contractAddress,
    abi: Badges.abi,
    functionName: 'unequip',
    args: [selectedToken.tokenId]
  })
  const {
    write,
    data: contractWriteData,
    isLoading: isLoadingSign
  } = useContractWrite(config)
  const {
    data: transactionData,
    isLoading: isLoadingTransaction,
    isSuccess: isSuccessTransaction
  } = useWaitForTransaction({
    hash: contractWriteData?.hash
  })

  const handleClickBadge = (tokenId: string, name: string, image: string) => {
    setIsOpen(true)
    setSelectedToken({
      tokenId,
      image,
      name
    })
  }

  return (
    <>
      <Head>
        <title>Burn 🔥</title>
        <meta name="description" content="Burn your badges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BurnDialog
        chainId={chainId}
        isWaitingSign={isLoadingSign}
        isLoading={isLoadingTransaction}
        isSuccess={isSuccessTransaction}
        onBurn={() => write?.()}
        image={selectedToken.image}
        title={selectedToken.name}
        txHash={contractWriteData?.hash || ''}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      />
      <BadgesView
        title="Select the badge to 🔥"
        badges={badgesData?.badges}
        handleClickBadge={handleClickBadge}
        filterBy={(status) => status !== 'BURNED'}
        isLoading={isLoadingFetchBadges}
        isSuccess={isSuccess}
      />
      <BadgesView
        title="Burned badges 🔥"
        badges={badgesData?.badges}
        filterBy={(status) => status === 'BURNED'}
        isLoading={isLoadingFetchBadges}
        isSuccess={isSuccess}
      />
    </>
  )
}
