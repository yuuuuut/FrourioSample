import { useEffect, useState } from 'react'

import { apiClient } from '~/utils/apiClient'
import { RequestShow } from '~/server/types'

import UserCard from '~/components/users/UserCard'

import { ExclamationCircleIcon } from '@heroicons/react/outline'

/**
 * Main
 */
const Index = () => {
  // states
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
   * RequestをUpdateします。
   */
  const updateRequest = async (userId: string) => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const resUser = await apiClient.user
        ._userId(userId)
        .requests.patch({ headers: { authorization: token } })

      console.log(resUser)
    } catch (err) {
      console.log(err)
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
            <UserCard
              user={r.visiterUser!}
              types={{ type: 'PERMIT', updateRequest }}
            />
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <div className="mx-auto mt-10 col-start-1" />
          <div className="mx-auto col-start-1">
            <ExclamationCircleIcon className="h-20 w-20 text-gray-400" />
          </div>
          <div className="mx-auto col-start-1">
            <p className="font-bold text-xl text-gray-400">
              友達申請はありません。
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Index
