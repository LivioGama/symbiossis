'use client'

import Logo from '@/components/general/Logo'

const NavBar = () => (
  <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/50 border-b border-border/40'>
    <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <Logo />
        <h1 className='font-medium tracking-wide text-gradient'>symbiossis</h1>
      </div>
      {/*<nav>*/}
      {/*  <ul className='flex items-center space-x-6'>*/}
      {/*    <li>*/}
      {/*      <a*/}
      {/*        href='/privacy'*/}
      {/*        className='text-sm text-foreground/80 hover:text-foreground transition-colors'>*/}
      {/*        Privacy Policy*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</nav>*/}
    </div>
  </header>
)

export default NavBar
