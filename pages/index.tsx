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
import { useRouter } from 'next/dist/client/router'

const Home = () => {
  const router = useRouter()

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

      const token = await firebase.auth().currentUser?.getIdToken(true)
      console.log(token)
      if (token) {
        localStorage.setItem('@token', token)
      }

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

      router.push(`/users/${user.body.user.id}`)
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

  const a = async () => {
    const token = localStorage.getItem('@token')

    if (!token) {
      console.error('Tokenが存在しません。')
      return
    }

    const res = await apiClient.user
      ._userId('1')
      .relationships.post({ headers: { authorization: token } })

    console.log(res)
  }

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

        <button onClick={a}>Follow</button>
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
        </div>
      </main>
    </div>
  )
}

export default Home
