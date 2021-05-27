import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { TodoShow } from '~/server/types'
import { apiClient } from '~/utils/apiClient'

const ShowTodo = () => {
  const router = useRouter()

  console.log(router.query)

  const [id, setId] = useState<string>()
  const [ogpLoad, setOgpLoad] = useState(true)
  const [todoShow, setTodoShow] = useState({} as TodoShow)

  const getTodo = async (id: number) => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.todos._todoId(id).get({
        headers: { authorization: token }
      })
      console.log(res)

      setTodoShow(res.body.todo)
      setOgpLoad(false)
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
      const todoId = Number(id)
      getTodo(todoId)
    }
  }, [id])

  return (
    <div>
      {todoShow ? (
        <section className="hero container max-w-screen-lg mx-auto pb-10 mt-5 flex">
          {ogpLoad ? (
            <div>OGP Loading...</div>
          ) : (
            <img
              className="mx-auto"
              width="430"
              height="300"
              src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_STORAGEBUCKET}/o/ogps%2F${id}.png?alt=media&token=${id}`}
            />
          )}
        </section>
      ) : (
        <div>Not Todo</div>
      )}
    </div>
  )
}

export default ShowTodo
