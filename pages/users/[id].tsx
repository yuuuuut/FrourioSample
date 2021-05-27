import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import type { Todo } from '$prisma/client'
import { apiClient } from '~/utils/apiClient'
import { UserShow } from '~/server/types'

import UserShowHeader from '~/components/users/UserShowHeader'
import TodoList from '~/components/todos/TodoList'

/**
 * Main
 */
const ShowUser = () => {
  const router = useRouter()

  const [id, setId] = useState<string>()
  const [page, setPgae] = useState(1)
  const [userShow, setUserShow] = useState({} as UserShow)
  const [userTodos, setUserTodos] = useState<Todo[]>([])
  const [notTodos, setNotTodos] = useState(false)

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

      const resUser = await apiClient.user
        ._userId(id)
        .get({ headers: { authorization: token } })

      setUserShow(resUser.body.user)
    } catch (err) {
      console.log(err.response)
    }
  }

  /**
   * Todoの配列を取得します。
   */
  const getTodos = async (id: string) => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const resTodos = await apiClient.user
        ._userId(id)
        .todos.get({ query: { page }, headers: { authorization: token } })

      if (!resTodos.body.todos.length) {
        setNotTodos(true)
        return
      }

      setUserTodos(userTodos.concat(resTodos.body.todos))
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
      getUser(id)
    }
  }, [id])

  /**
   * id か page が変更されたら
   */
  useEffect(() => {
    if (id) {
      getTodos(id)
    }
  }, [id, page])

  return (
    <div>
      {userShow ? (
        <div>
          <div className="my-8 text-center md:my-4">
            <UserShowHeader
              displayName={userShow.displayName}
              photoUrl={userShow.photoUrl}
            />
          </div>
          <TodoList todos={userTodos} />
          <div className="my-8 text-center md:my-4">
            {notTodos ? (
              <div>Todoが存在しません</div>
            ) : (
              <button
                onClick={() => setPgae(page + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <span>Todoをもっとみる</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>Not User</div>
      )}
    </div>
  )
}

export default ShowUser
