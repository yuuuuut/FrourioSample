import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

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
    <>
      <Head>
        <meta property="description" content={'Hoge'} />
        <meta property="og:title" content={'Fuga'} />
        <meta property="og:description" content={'Geha'} />
        <meta
          property="og:image"
          content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_STORAGEBUCKET}/o/ogps%2F${id}.png?alt=media&token=${id}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {todoShow ? (
        <div className="grid grid-cols-1 gap-1">
          <div className="col-start-1 mt-5">
            {ogpLoad ? (
              <div className="border border-light-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4"></div>
              </div>
            ) : (
              <img
                className="mx-auto w-3/4 sm:w-1/2"
                src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_STORAGEBUCKET}/o/ogps%2F${id}.png?alt=media&token=${id}`}
              />
            )}
          </div>
        </div>
      ) : (
        <div>Not Todo</div>
      )}
    </>
  )
}

export default Show
