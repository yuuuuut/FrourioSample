import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { UserShow } from '~/server/types'
import { apiClient } from '~/utils/apiClient'

const ShowUser = () => {
  const router = useRouter()
  console.log(router.query)

  const [id, setId] = useState<string>()
  const [userShow, setUserShow] = useState({} as UserShow)

  const getUser = async (id: string) => {
    try {
      const res = await apiClient.user._userId(id).get()

      setUserShow(res.body.user)
    } catch (err) {
      console.log(err.response.status)
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