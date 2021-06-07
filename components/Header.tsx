import React, { Fragment, useState } from 'react'
import Link from 'next/link'

import { useAuthentication } from '~/utils/recoils/authentication'

import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import HeaderNavigation from './HeaderNavigation'

/**
 * Main
 */
export default function Header() {
  // Recoil
  const { user, login, logout } = useAuthentication()

  const [isOpen, setIsOpen] = useState(false)

  const responsiveLogoutButton = () => {
    setIsOpen(false)
    logout()
  }

  return (
    <Popover className="relative bg-white">
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href={'/'}>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </Link>
            </div>
            {user ? (
              <>
                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <MenuIcon
                      onClick={() => setIsOpen(true)}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>

                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                  <HeaderNavigation user={user} />
                </Popover.Group>

                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <a
                    onClick={logout}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    ログアウト
                  </a>
                </div>
              </>
            ) : (
              <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                <a
                  onClick={login}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  ログイン
                </a>
              </div>
            )}
          </div>
        </div>

        {user && (
          <Transition
            show={isOpen}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-end">
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon
                          onClick={() => setIsOpen(false)}
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav
                      className="grid gap-y-8"
                      onClick={() => setIsOpen(false)}
                    >
                      <HeaderNavigation user={user} />
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <a
                    onClick={responsiveLogoutButton}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    ログアウト
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        )}
      </>
    </Popover>
  )
}
