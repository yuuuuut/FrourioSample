import { Menu } from '@headlessui/react'
import Link from 'next/link'

import { User } from '~/utils/authentication'

// Profile Setting
const profile = ['マイページ', 'ログアウト']

/**
 * Types
 */
type Props = {
  user: User
}

/**
 * Main
 */
export default function HeaderProfile(props: Props) {
  const { user } = props

  return (
    <>
      {profile.map((item, idx) => (
        <Menu.Item key={item}>
          {idx === 0 && (
            <div
              key={item}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              <Link href={`/users/${user.id}`}>{item}</Link>
            </div>
          )}
        </Menu.Item>
      ))}
    </>
  )
}
