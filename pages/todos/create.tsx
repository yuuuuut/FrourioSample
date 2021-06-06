import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import { apiClient } from '~/utils/apiClient'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { useAuthentication } from '~/utils/authentication'

/**
 * Main
 */
export default function CreateTodo() {
  const today = moment().add(1, 'days').toDate()
  const { user, errorHandling } = useAuthentication()

  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState<Date>(today)

  const inputTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    []
  )

  const createTodo = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault()

        if (!user) {
          throw Object.assign(new Error('ユーザーが存在しません。'), {
            response: { status: 403 }
          })
        }

        const res = await apiClient.todos.post({
          body: { title, due_date: dueDate, userId: user.id }
        })
        console.log(res)
      } catch (err) {
        errorHandling(err)
      }
    },
    [title, dueDate]
  )

  return (
    <>
      <div className="grid grid-cols-1 gap-1">
        <div className="mx-auto mt-7 mb-5">
          <p className="text-3xl text-gray-500">Todoの作成</p>
        </div>
      </div>

      <div className="w-full mx-auto max-w-xs">
        <form
          className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={createTodo}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              タイトル
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={inputTitle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              期限日
            </label>
            <div className="z-0">
              <DatePicker
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                selected={dueDate}
                minDate={dueDate}
                onChange={(date: Date) => setDueDate(date)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
