import Head from 'next/head'
import { useCallback, useState } from 'react'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'

import type { FormEvent, ChangeEvent } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Home = () => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())

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
    <div className={styles.container}>
      <Head>
        <title>frourio-todo-app</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>frourio-todo-app</p>

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
