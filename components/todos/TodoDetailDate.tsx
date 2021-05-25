import Moment from 'react-moment'
import moment from 'moment'

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
const TodoDetailDate = (props: Props) => {
  const format = 'YYYY-MM-DD'
  const { todo } = props

  /**
   * 期日が一日後のTodoの場合、trueを返す。
   */
  const checkLimitOneDay = (todoDueDate: Date) => {
    const tomorrow = moment().add(1, 'days').format(format)
    const dueDateAddOneDay = moment(todoDueDate).format(format)

    return tomorrow === dueDateAddOneDay
  }

  /**
   * 期日が過ぎているTodoの場合、trueを返す。
   */
  const checkOverDay = (todoDueDate: Date) => {
    const today = moment()
    const dueDate = moment(todoDueDate).format(format)

    return today.isSameOrAfter(dueDate)
  }

  return (
    <>
      {todo.done && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          <Moment format={format}>{todo.due_date}</Moment>
        </td>
      )}

      {!todo.done && (
        <>
          {checkOverDay(todo.due_date) && (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
              <Moment format={format}>{todo.due_date}</Moment>
              <p>期日が過ぎたタスクです。</p>
            </td>
          )}
          {checkLimitOneDay(todo.due_date) && (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
              <Moment format={format}>{todo.due_date}</Moment>
              <p>期日が明日までのタスクです。</p>
            </td>
          )}
        </>
      )}

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        <Moment format={format}>{todo.createdAt}</Moment>
      </td>
    </>
  )
}

export default TodoDetailDate
