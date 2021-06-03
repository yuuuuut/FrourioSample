import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '~/utils/apiClient'

import type { FormEvent, ChangeEvent } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import FlashMessage from '~/components/uis/FlashMessage'

const Home = () => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [flashMessage, setFlashMessage] = useState('')

  const inputTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    []
  )

  const createTodo = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      console.log(title)
      console.log(startDate)
      if (!startDate) return

      const res = await apiClient.todos.post({
        body: { title, due_date: startDate, userId: '1' }
      })
      console.log(res)
    },
    [title, startDate]
  )

  const flash403 = () => {
    const message = localStorage.getItem('flash-403')
    if (!message) return

    setFlashMessage(message)
    setTimeout(() => {
      setFlashMessage('')
    }, 5000)

    localStorage.removeItem('flash-403')
  }

  useEffect(() => {
    flash403()
  }, [])
  /*
  const toggleDone = useCallback(async (task: Task) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } })
    revalidate()
  }, [])

  const deleteTask = useCallback(async (task: Task) => {
    await apiClient.tasks._taskId(task.id).delete()
    revalidate()
  }, [])

  if (error) return <div>failed to load</div>
  if (!tasks) return <div>loading...</div>

  */

  return (
    <div>
      <Head>
        <title>frourio-todo-app</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <div className="mx-10 my-5">
          {flashMessage !== '' && <FlashMessage flashMessage={flashMessage} />}
        </div>
        <div>
          <h2>Todo Create</h2>
          <form onSubmit={createTodo}>
            <input value={title} type="text" onChange={inputTitle} />
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
            />
            <input type="submit" value="ADD" />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
