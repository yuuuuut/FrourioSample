import Moment from 'react-moment'
import moment from 'moment'

import type { Todo } from '$prisma/client'

/**
 * Types
 */
type Props = {
  todo: Todo
}

type DefaultStyleColor = 'gray' | 'red' | 'purple'

/**
 * Main
 */
const TodoDetailDate = (props: Props) => {
  const format = 'YYYY-MM-DD'
  const { todo } = props

  const defaultStyle = (color: DefaultStyleColor) => {
    return `px-6 py-4 whitespace-nowrap text-sm text-${color}-600`
  }

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
        <td className={defaultStyle('gray')}>
          <Moment format={format}>{todo.due_date}</Moment>
        </td>
      )}

      {!todo.done && (
        <>
          {checkOverDay(todo.due_date) && (
            <td className={defaultStyle('purple')}>
              <Moment format={format}>{todo.due_date}</Moment>
              <p>期日が過ぎたタスクです。</p>
            </td>
          )}
          {checkLimitOneDay(todo.due_date) && (
            <td className={defaultStyle('red')}>
              <Moment format={format}>{todo.due_date}</Moment>
              <p>期日が明日までのタスクです。</p>
            </td>
          )}
        </>
      )}

      <td className={defaultStyle('gray')}>
        <Moment format={format}>{todo.createdAt}</Moment>
      </td>
    </>
  )
}

export default TodoDetailDate
