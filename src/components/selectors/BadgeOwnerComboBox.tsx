import { Fragment, useState, Dispatch, SetStateAction } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import type { IBadge } from '@/lib/otterspace/types'

interface BadgeOwnerComboBoxProps {
  badges: IBadge[]
  selectedBadge: IBadge | undefined
  setSelectedBadge: Dispatch<SetStateAction<IBadge | undefined>>
}

export const BadgeOwnerComboBox = ({
  badges,
  selectedBadge,
  setSelectedBadge
}: BadgeOwnerComboBoxProps) => {
  const [queryBadge, setQueryBadge] = useState('')
  const filteredBadges = badges.filter(({ owner }) =>
    owner.toLocaleLowerCase().includes(queryBadge.toLocaleLowerCase())
  )

  return (
    <Combobox value={selectedBadge} onChange={setSelectedBadge}>
      <div className="relative mt-1">
        <Combobox.Label className="mb-1 text-sm">Owner Address:</Combobox.Label>
        <div className="relative flex w-full cursor-default items-center overflow-hidden rounded-lg border bg-white py-2 text-left focus-within:border-stone-700 hover:border-stone-400 hover:focus-within:border-stone-700 sm:text-sm">
          <Combobox.Input
            className="mx-2 w-full overflow-auto truncate pl-1 pr-7 text-base text-gray-900 focus:outline-none"
            displayValue={(badge: IBadge) => badge?.owner}
            onChange={(event) => setQueryBadge(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-2 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQueryBadge('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
            {filteredBadges.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredBadges.map((badge) => (
                <Combobox.Option
                  key={badge.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-stone-300' : 'text-gray-900'
                    }`
                  }
                  value={badge}
                >
                  {({ selected }) => (
                    <div className="flex">
                      <span
                        className={`block truncate pl-5 ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {badge.owner}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
