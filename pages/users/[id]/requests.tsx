import { useEffect, useState } from 'react'
import { apiClient } from '~/utils/apiClient'

import type { User } from '$prisma/client'
import UserCard from '~/components/users/UserCard'

const UserRelationships = () => {
  const [users, setUsers] = useState<User[]>([])

  const getFollowers = async () => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId('siKgxnMy0YgQc6Gk7leRYnAU7xc2')
        .relationships.get({ headers: { authorization: token } })

      console.log(res)
      setUsers(res.body.users)
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    getFollowers()
  }, [])

  return (
    <>
      {users.length ? (
        users.map((user) => (
          <div key={user.id}>
            <UserCard user={user} />
          </div>
        ))
      ) : (
        <div>None User</div>
      )}
    </>
  )
}

export default UserRelationships
