import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Navbar = () => {
  return (
    <nav className="flex h-24 items-center justify-between bg-dark-yellow px-4 xs:px-10 sm:px-14">
      <Link href="/">
        <h2 className="mr-1 cursor-pointer text-center text-sm font-bold xs:text-lg sm:text-2xl">
          Otterspace Utils
        </h2>
      </Link>
      <ConnectButton />
    </nav>
  )
}
