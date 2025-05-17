"use client"

import React from 'react'
import { Container } from './container'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu'
import Link from 'next/link'

function Navbar() {

  return (
    <nav className="sticky top-0 z-75 bg-white border-b border-amber-200 shadow-sm">
      <Container className="flex h-16 items-start flex-row">
        {/* Logo/Brand on the left */}
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
            Food<span className="text-amber-400">Vision</span>
          </Link>
        </div>
        
        {/* Navigation buttons on the right */}
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
                <NavigationMenuLink className="
                  px-4 py-2 rounded-lg
                  text-sm font-semibold
                  text-gray-700 hover:text-amber-600
                  hover:bg-amber-50
                  transition-colors duration-200
                "
                href='/'
                >
                  Home 
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink className="
                  px-4 py-2 rounded-lg
                  text-sm font-semibold
                  text-gray-700 hover:text-amber-600
                  hover:bg-amber-50
                  transition-colors duration-200
                "
                href='/history'
                >
                  History
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink className="
                  px-4 py-2 rounded-lg
                  text-sm font-semibold
                  text-gray-700 hover:text-amber-600
                  hover:bg-amber-50
                  transition-colors duration-200
                "
                href="/"
                >
                  User Settings
                </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </nav>
  )
}

export { Navbar }