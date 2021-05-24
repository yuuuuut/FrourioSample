import Link from 'next/link'

import type { Todo } from '$prisma/client'

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

  return (
    <Link href={`/todos/${todo.id}`} key={todo.id}>
      <tr>
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
          <Link href="/">Edit</Link>
        </td>
      </tr>
    </Link>
  )
}

export default TodoDetail
