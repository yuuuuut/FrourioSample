import Link from 'next/link'

import { User } from '~/utils/recoils/authentication'

/**
 * Types
 */
type Props = {
  user: User
}

/**
 * Main
 */
export default function HeaderNavigation(props: Props) {
  const { user } = props

  return (
    <>
      <div className="text-base font-medium text-gray-500 hover:text-gray-900">
        <Link href={`/users/${user.id}/relationships`}>友達一覧</Link>
      </div>
      <div className="text-base font-medium text-gray-500 hover:text-gray-900">
        <Link href={`/users/${user.id}/requests`}>友達申請</Link>
      </div>
      <div className="text-base font-medium text-gray-500 hover:text-gray-900">
        <Link href={`/users`}>友達検索</Link>
      </div>
      <div className="text-base font-medium text-gray-500 hover:text-gray-900">
        <Link href={`/users/${user.id}`}>マイページ</Link>
      </div>
    </>
  )
}
