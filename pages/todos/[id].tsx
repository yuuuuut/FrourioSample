import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { apiClient } from '~/utils/apiClient'
import { TodoShow } from '~/server/types'

/**
 * Main
 */
const Show = () => {
  // router
  const router = useRouter()

  // states
  const [id, setId] = useState<string>()
  const [ogpLoad, setOgpLoad] = useState(true)
  const [todoShow, setTodoShow] = useState({} as TodoShow)

  /**
   * Todoを取得します。
   */
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

  /**
   * router が変更されたら
   */
  useEffect(() => {
    if (router.asPath !== router.route) {
      const id = router.query.id as string
      setId(id)
    }
  }, [router])

  /**
   * id が変更されたら
   */
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

export default Show
