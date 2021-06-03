import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { useAuthentication } from '~/utils/authentication'
import { apiClient } from '~/utils/apiClient'

import UserCardSkeleton from '~/components/users/UserCardSkeleton'
import UserCard from '~/components/users/UserCard'
import NotData from '~/components/uis/NotData'

import type { User } from '$prisma/client'

/**
 * Main
 */
const Index = () => {
  // router
  const router = useRouter()
  const id = router.query.id as string

  // recoil
  const { getToken, errorHandling } = useAuthentication()

  // states
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * Relationshipの配列を取得します。
   */
  const getRelationships = async () => {
    try {
      const token = getToken()

      const res = await apiClient.user
        ._userId(id)
        .relationships.get({ headers: { authorization: token } })

      console.log(res)

      setUsers(res.body.users)
      setLoading(false)
    } catch (err) {
      errorHandling(err)
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
