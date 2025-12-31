'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

export const HeroHeader = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)
    
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
      <header>
        <nav className="fixed z-20 w-full px-2">
          <div
            className={cn(
              "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
              isScrolled &&
                "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
            )}
          >
            <div className="relative flex items-center justify-between py-3 lg:py-4">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image
                  src={"https://ik.imagekit.io/zaia2gfsw/logo.png"}
                  height={35}
                  width={35}
                  alt="Logo"
                  className="rounded-xl"
                />
                {/* <p className='flex font-sans text-2xl'>Synq</p> */}
              </Link>

              <div className="flex items-center gap-3">
                <AnimatedThemeToggler />
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
}