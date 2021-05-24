import { useCallback, useState } from 'react'

import { apiClient } from '~/utils/apiClient'
import type { Todo } from '$prisma/client'

import Modal from '../uis/Modal'
import { useRouter } from 'next/dist/client/router'

/**
 * Types
 */
type Props = {
  todo: Todo
}

/**
 * Main
 */
const TodoDetail = (props: Props) => {
  const router = useRouter()

  const { todo } = props

  const [isOpen, setIsOpen] = useState(false)

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
    <tr key={todo.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{todo.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {todo.done ? (
            <div className="text-sm text-gray-900">完了</div>
          ) : (
            <div className="text-sm text-gray-900">未完了</div>
          )}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {todo.due_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Modal
          title={'Todoの更新'}
          describe={'Todoを完了済みにしますか?'}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          okClickFn={() => updateTodo(todo)}
        />
        <div onClick={() => setIsOpen(true)}>更新</div>
      </td>
    </tr>
  )
}

export default TodoDetail
