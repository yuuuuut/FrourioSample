import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { apiClient } from '~/utils/apiClient'
import { UserShow } from '~/server/types'

/**
 * Main
 */
const ShowUser = () => {
  const router = useRouter()

  const [id, setId] = useState<string>()
  const [page, setPgae] = useState(1)
  const [userShow, setUserShow] = useState({} as UserShow)

  /**
   * Userを取得します。
   */
  const getUser = async (id: string) => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId(id)
        .get({ query: { page }, headers: { authorization: token } })
      console.log(res)

      setUserShow(res.body.user)
    } catch (err) {
      console.log(err.response)
    }
  }

  /**
   *
   */
  useEffect(() => {
    if (router.asPath !== router.route) {
      const id = router.query.id as string
      setId(id)
    }
  }, [router])

  /**
   *
   */
  useEffect(() => {
    if (id) {
      getUser(id)
    }
  }, [id])

  return <div>{userShow ? <h1>{userShow.id}</h1> : <div>Not User</div>}</div>
}

export default ShowUser
