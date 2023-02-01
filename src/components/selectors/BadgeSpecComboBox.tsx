import { Fragment, useState, Dispatch, SetStateAction } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { CardImage } from '@/components/CardImage'
import type { IBadgeSpec } from '@/lib/otterspace/types'

interface BadgeSpecComboBoxProps {
  specs: IBadgeSpec[]
  selectedBadgeSpec: IBadgeSpec | undefined
  setSelectedBadgeSpec: Dispatch<SetStateAction<IBadgeSpec | undefined>>
}
export const BadgeSpecComboBox = ({
  specs,
  selectedBadgeSpec,
  setSelectedBadgeSpec
}: BadgeSpecComboBoxProps) => {
  const [queryBadgeSpec, setQueryBadgeSpec] = useState('')
  const filteredSpecs = specs.filter(({ metadata }) =>
    metadata.name
      .toLocaleLowerCase()
      .includes(queryBadgeSpec.toLocaleLowerCase())
  )

  return (
    <Combobox value={selectedBadgeSpec} onChange={setSelectedBadgeSpec}>
      <div className="relative mt-1">
        <Combobox.Label className="mb-1 text-sm">Badge Spec:</Combobox.Label>
        <div className="relative flex w-full cursor-default items-center overflow-hidden rounded-lg border bg-white py-2 text-left focus-within:border-stone-700 hover:border-stone-400 hover:focus-within:border-stone-700 sm:text-sm">
          <CardImage
            className="ml-3"
            alt="badge image"
            src={selectedBadgeSpec?.metadata.image.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            )}
            height={36}
            width={36}
          />
          <Combobox.Input
            className="mx-2 truncate pl-1 pr-6 text-base text-gray-900 focus:outline-none"
            displayValue={(spec: IBadgeSpec) => spec?.metadata?.name}
            onChange={(event) => setQueryBadgeSpec(event.target.value || '')}
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
          afterLeave={() => setQueryBadgeSpec('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-stone-700 bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
            {filteredSpecs.length === 0 && queryBadgeSpec !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredSpecs.map((spec) => (
                <Combobox.Option
                  key={spec.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-stone-300' : 'text-gray-900'
                    }`
                  }
                  value={spec}
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <div className="ml-4 w-6">
                        <CardImage
                          alt="badge image"
                          src={spec?.metadata.image.replace(
                            'ipfs://',
                            'https://ipfs.io/ipfs/'
                          )}
                          height={30}
                          width={30}
                        />
                      </div>
                      <span
                        className={`block truncate pl-3 ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {spec.metadata.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
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
