import Head from 'next/head'
import { useCallback, useState } from 'react'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import UserBanner from '~/components/UserBanner'

import firebase from '~/utils/firebase'

import type { FormEvent, ChangeEvent } from 'react'

import type { Todo } from '$prisma/client'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Home = () => {
  const [page, setPgae] = useState(1)
  const {
    data: todos,
    error,
    revalidate
  } = useAspidaSWR(apiClient.todos, {
    query: { page }
  })
  console.log(todos)

  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const inputTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    []
  )

  /**
   * Google Login
   */
  const login = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      const data = await firebase.auth().signInWithPopup(provider)
      if (!data.user) {
        console.log('none user data')
        return
      }

      const body = {
        id: data.user.uid,
        displayName: data.user.displayName || '',
        photoUrl: data.user.photoURL || ''
      }

      const user = await apiClient.user.post({ body })
      console.log(user)
    } catch (err) {
      console.log(err)
    }
  }, [])

  /**
   * GoogleAuth SignOut
   */
  const logout = useCallback(async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logout')
        localStorage.removeItem('@token')
      })
  }, [])

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

  const updateTodo = useCallback(async (todo: Todo) => {
    const res = await apiClient.todos
      ._todoId(todo.id)
      .patch({ body: { done: !todo.done } })
    console.log(res)
    revalidate()
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

  if (error) return <div>failed to load</div>
  if (!todos) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>frourio-todo-app</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <UserBanner />

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>frourio-todo-app</p>

        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>

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

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => updateTodo(todo)}
                  />
                  <span>{todo.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Home
