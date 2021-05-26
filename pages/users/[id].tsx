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

      const resTodos = await apiClient.user
        ._userId(id)
        .todos.get({ query: { page }, headers: { authorization: token } })

      setUserShow(resUser.body.user)
      setUserTodos(userTodos.concat(resTodos.body.todos))
    } catch (err) {
      console.log(err.response)
    }
  }

  const addTodos = () => {
    const addPage = page + 1
    setPgae(addPage)
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
          <button onClick={addTodos}>Add Todo</button>
        </div>
      ) : (
        <div>Not User</div>
      )}
    </div>
  )
}

export default ShowUser
