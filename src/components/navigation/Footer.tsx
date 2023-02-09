import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="flex h-20 items-center justify-center border-t-2 border-black bg-dark-yellow text-center">
      <h4 className="mr-2 text-neutral-900">
        Made with ❤️ by{' '}
        <a
          className="font-bold"
          target="_blank"
          href="https://twitter.com/VitorMarthendal"
          rel="noreferrer"
        >
          Vitor Marthendal
        </a>
      </h4>{' '}
      <a
        href="https://github.com/marthendalnunes/otterspace-utils"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="GitHub logo"
          src="/github-logo.png"
          width={20}
          height={20}
        />
      </a>
    </footer>
  )
}
