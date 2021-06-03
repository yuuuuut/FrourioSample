import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { apiClient } from '~/utils/apiClient'

import type { User } from '$prisma/client'

import UserCard from '~/components/users/UserCard'
import NotData from '~/components/uis/NotData'
import UserCardSkeleton from '~/components/users/UserCardSkeleton'

/**
 * Main
 */
const Index = () => {
  // router
  const router = useRouter()
  const id = router.query.id as string

  // states
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * Relationshipの配列を取得します。
   */
  const getRelationships = async () => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId(id)
        .relationships.get({ headers: { authorization: token } })

      console.log(res)

      setUsers(res.body.users)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRelationships()
  }, [])

  return (
    <>
      {loading ? (
        <UserCardSkeleton />
      ) : users.length !== 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <UserCard user={user} types={{ type: 'FRIEND' }} />
          </div>
        ))
      ) : (
        <NotData
          describe={'友達はいません。'}
          iconKind={{ name: 'ExclamationCircleIcon' }}
        />
      )}
    </>
  )
}

export default Index
