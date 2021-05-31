import type { Todo } from '$prisma/client'

import TodoDetail from './TodoDetail'

/**
 * Types
 */
type Props = {
  todos: Todo[]
}

/**
 * Main
 */
const TodoList = (props: Props) => {
  const { todos } = props

  return (
    <table className="min-w-full divide-y  divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            タスク名
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            状態
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            期日
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            作成日
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          ></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {todos.map((todo) => (
          <TodoDetail key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  )
}

export default TodoList
