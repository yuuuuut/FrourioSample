import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { useAuthentication } from '~/utils/recoils/authentication'
import { apiClient } from '~/utils/apiClient'
import { UserShow } from '~/server/types'

import UserShowHeader from '~/components/users/UserShowHeader'
import TodoList from '~/components/todos/TodoList'
import NotData from '~/components/uis/NotData'

import type { Todo } from '$prisma/client'

/**
 * Main
 */
const Show = () => {
  // router
  const router = useRouter()

  // recoil
  const { getToken, errorHandling } = useAuthentication()

  // states
  const [id, setId] = useState<string>()
  const [page, setPgae] = useState(1)
  const [notTodos, setNotTodos] = useState(false)
  const [userShow, setUserShow] = useState({} as UserShow)
  const [userTodos, setUserTodos] = useState<Todo[]>([])

  /**
   * Userを取得します。
   */
  const getUser = async (id: string) => {
    try {
      const token = getToken()

      const resUser = await apiClient.user
        ._userId(id)
        .get({ headers: { authorization: token } })

      setUserShow(resUser.body.user)
    } catch (err) {
      errorHandling(err)
    }
  }

  /**
   * Todoの配列を取得します。
   */
  const getTodos = async (id: string) => {
    try {
      const token = getToken()

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
    <>
      {userShow ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="grid-start-1 mt-5 mx-auto">
            <UserShowHeader
              displayName={userShow.displayName}
              photoUrl={userShow.photoUrl}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 overflow-auto">
            <TodoList todos={userTodos} />
          </div>

          <div className="grid-start-1 mb-3 mx-auto">
            {notTodos ? (
              <NotData
                describe={'Todoは存在しません。'}
                iconKind={{ name: 'NotIcon' }}
              />
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
    </>
  )
}

export default Show
