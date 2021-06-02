import { Dispatch, SetStateAction, useCallback } from 'react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

import { apiClient } from '~/utils/apiClient'
import type { Todo } from '$prisma/client'

import Modal from '../uis/Modal'

/**
 * Types
 */
type Props = {
  todo: Todo
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * Main
 */
const TodoDetailButton = (props: Props) => {
  const { isOpen, setIsOpen, todo } = props

  const router = useRouter()

  /**
   * Todoをupdateします。
   */
  const updateTodo = useCallback(async (todo: Todo) => {
    const token = localStorage.getItem('@token')

    if (!token) {
      console.error('Tokenが存在しません。')
      return
    }

    const res = await apiClient.todos
      ._todoId(todo.id)
      .patch({ body: { done: !todo.done }, headers: { authorization: token } })
    console.log(res)

    router.push(`/todos/${todo.id}`)
  }, [])

  return (
    <>
      <Modal
        title={'Todoの更新'}
        describe={'Todoを完了済みにしますか?'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        usePlace={{ place: 'TODO_DETAIL', todo, updateTodo }}
      />
      {todo.done ? (
        <Link href={`/todos/${todo.id}`}>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            詳細
          </button>
        </Link>
      ) : (
        <button
          type="submit"
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => setIsOpen(true)}
        >
          更新
        </button>
      )}
    </>
  )
}

export default TodoDetailButton
