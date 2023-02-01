import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BaseDialogProps } from '@/components/dialogs/BaseDialog'
import { ContractActionDialog } from '@/components/dialogs/ContractActionDialog'
import { BadgeCardProps } from '@/components/cards/BadgeCard'
import { useOtterspaceContractsWrite } from '@/hooks/useOtterspaceContractsWrite'
import { getBadgeSpecBadges, getRaftBadges } from '@/lib/otterspace/client'
import { BadgeSpecComboBox } from '@/components/selectors/BadgeSpecComboBox'
import { BadgeOwnerComboBox } from '@/components/selectors/BadgeOwnerComboBox'
import type { IBadge, IBadgeSpec } from '@/lib/otterspace/types'
import { useNetwork } from 'wagmi'

interface RevokeBadgeDialogProps extends BadgeCardProps, BaseDialogProps {
  tokenId: string
}
export const RevokeBadgeDialog = ({
  tokenId,
  isOpen,
  onClose,
  image,
  title
}: RevokeBadgeDialogProps) => {
  const [selectedBadgeSpec, setSelectedBadgeSpec] = useState<IBadgeSpec>()
  const [selectedBadge, setSelectedBadge] = useState<IBadge>()
  const selectedBadgeId = selectedBadge?.id?.replace('badges:', '')

  const { chain } = useNetwork()

  const raftBadgesQuery = useQuery({
    queryKey: ['raft-badges', chain?.id, tokenId],
    queryFn: async () => getRaftBadges(tokenId)
  })
  const specs: IBadgeSpec[] = raftBadgesQuery?.data?.raft?.specs || []

  const badgeSpecBadgesQuery = useQuery({
    queryKey: ['badge-spec-badges', chain?.id, selectedBadgeSpec?.id],
    queryFn: async () => getBadgeSpecBadges(selectedBadgeSpec?.id || '')
  })
  const badges: IBadge[] =
    badgeSpecBadgesQuery?.data?.badgeSpec?.badges?.filter(
      (badge: IBadge) => badge.status !== 'REVOKED' && badge.status !== 'BURNED'
    ) || []

  const {
    chainId,
    prepareContractWrite,
    contractWrite,
    waitForTransaction,
    onWrite
  } = useOtterspaceContractsWrite({
    args: [Number(tokenId), selectedBadgeId, 3],
    contract: 'BADGES',
    functionName: 'revokeBadge'
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onWrite()
  }

  useEffect(() => {
    setSelectedBadge(undefined)
  }, [selectedBadgeSpec])

  return (
    <ContractActionDialog
      initialTitle="Do you want to revoke a badge with this raft?"
      loadingTitle="Revoking badge..."
      successTitle="Badge revoked!"
      buttonLabel="Revoke"
      handleSubmit={handleSubmit}
      chainId={chainId}
      transactionHash={waitForTransaction.data?.transactionHash}
      isLoadingSign={contractWrite.isLoading}
      isLoadingTransaction={waitForTransaction.isLoading}
      isSuccess={waitForTransaction.isSuccess}
      isError={waitForTransaction.isError}
      errorMessage={waitForTransaction.error?.message}
      isOpen={isOpen}
      isValidAction={prepareContractWrite.isSuccess}
      onClose={() => {
        onClose()
        contractWrite.reset()
        setSelectedBadgeSpec(undefined)
        setSelectedBadge(undefined)
      }}
      image={image}
      title={title}
    >
      <BadgeSpecComboBox
        specs={specs}
        selectedBadgeSpec={selectedBadgeSpec}
        setSelectedBadgeSpec={setSelectedBadgeSpec}
      />
      <BadgeOwnerComboBox
        badges={badges}
        selectedBadge={selectedBadge}
        setSelectedBadge={setSelectedBadge}
      />
    </ContractActionDialog>
  )
}
