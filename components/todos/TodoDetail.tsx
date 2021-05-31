import { useState } from 'react'

import type { Todo } from '$prisma/client'

import TodoDetailButton from './TodoDetailButton'
import TodoDetailDate from './TodoDetailDate'

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
  const { todo } = props

  const [isOpen, setIsOpen] = useState(false)

  return (
    <tr key={todo.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{todo.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {todo.done ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div className="mt-0.5 text-sm text-gray-800">完了</div>
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="mt-0.5 text-sm text-gray-800">未完了</div>
          </span>
        )}
      </td>

      <TodoDetailDate todo={todo} />
      <td className="px-6 py-4 whitespace-nowrap">
        <TodoDetailButton todo={todo} isOpen={isOpen} setIsOpen={setIsOpen} />
      </td>
    </tr>
  )
}

export default TodoDetail
