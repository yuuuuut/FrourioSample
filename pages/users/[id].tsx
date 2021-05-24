import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { UserShow } from '~/server/types'
import { apiClient } from '~/utils/apiClient'

const ShowUser = () => {
  const [page, setPgae] = useState(1)

  const router = useRouter()
  console.log(router.query)

  const [id, setId] = useState<string>()
  const [userShow, setUserShow] = useState({} as UserShow)

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

  useEffect(() => {
    if (router.asPath !== router.route) {
      console.log(router.query)
      const id = router.query.id as string
      setId(id)
    }
  }, [router])

  useEffect(() => {
    if (id) {
      getUser(id)
    }
  }, [id])

  return <div>{userShow ? <h1>{userShow.id}</h1> : <div>Not User</div>}</div>
}

export default ShowUser
