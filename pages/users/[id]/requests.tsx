import { useEffect, useState } from 'react'

import { apiClient } from '~/utils/apiClient'
import { RequestShow } from '~/server/types'

import UserCard from '~/components/users/UserCard'

/**
 * Main
 */
const RequestIndex = () => {
  const [requests, setRequests] = useState<RequestShow[]>([])

  /**
   * Requestの配列を取得する。
   */
  const getRequests = async () => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId('siKgxnMy0YgQc6Gk7leRYnAU7xc2')
        .requests.get({ headers: { authorization: token } })

      console.log(res)
      setRequests(res.body.requests)
    } catch (err) {
      console.log(err.response)
    }
  }

  /**
   *
   */
  useEffect(() => {
    getRequests()
  }, [])

  return (
    <>
      {requests.length ? (
        requests.map((r) => (
          <div key={r.id}>
            <UserCard user={r.visiterUser!} type={'PERMIT'} />
          </div>
        ))
      ) : (
        <div>None User</div>
      )}
    </>
  )
}

export default RequestIndex
