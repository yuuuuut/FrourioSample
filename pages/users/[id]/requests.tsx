import { useEffect, useState } from 'react'

import { useAuthentication } from '~/utils/recoils/authentication'
import { apiClient } from '~/utils/apiClient'

import UserCard from '~/components/users/UserCard'
import NotData from '~/components/uis/NotData'

import { RequestShow } from '~/server/types'

/**
 * Main
 */
const Index = () => {
  // recoil
  const { getToken, errorHandling } = useAuthentication()

  // states
  const [requests, setRequests] = useState<RequestShow[]>([])

  /**
   * Requestの配列を取得する。
   */
  const getRequests = async () => {
    try {
      const token = getToken()

      const res = await apiClient.user
        ._userId('siKgxnMy0YgQc6Gk7leRYnAU7xc2')
        .requests.get({ headers: { authorization: token } })

      console.log(res)
      setRequests(res.body.requests)
    } catch (err) {
      errorHandling(err)
    }
  }

  /**
   * RequestをUpdateします。
   */
  const updateRequest = async (userId: string) => {
    try {
      const token = getToken()

      const resUser = await apiClient.user
        ._userId(userId)
        .requests.patch({ headers: { authorization: token } })

      console.log(resUser)
    } catch (err) {
      errorHandling(err)
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
        <NotData
          describe={'友達申請はありません。'}
          iconKind={{ name: 'ExclamationCircleIcon' }}
        />
      )}
    </>
  )
}

export default Index
