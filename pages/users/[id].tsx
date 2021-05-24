import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { apiClient } from '~/utils/apiClient'

import TodoList from '~/components/todos/TodoList'

import type { Todo } from '$prisma/client'
import { UserShow } from '~/server/types'
import UserShowHeader from '~/components/users/UserShowHeader'

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

      const res = await apiClient.user
        ._userId(id)
        .get({ query: { page }, headers: { authorization: token } })
      console.log(res)

      setUserShow(res.body.user)

      if (res.body.user.todos) setUserTodos(res.body.user.todos)
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
        </div>
      ) : (
        <div>Not User</div>
      )}
    </div>
  )
}

export default ShowUser
