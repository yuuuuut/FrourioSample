import Head from 'next/head'
import { useCallback, useState } from 'react'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import UserBanner from '~/components/UserBanner'

import firebase from '~/utils/firebase'

import type { FormEvent, ChangeEvent } from 'react'

const Home = () => {
  //const { data: tasks, error, revalidate } = useAspidaSWR(apiClient.tasks)
  const [label, setLabel] = useState('')
  const inputLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value),
    []
  )

  /**
   * Google Login
   */
  const login = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (data) => {
        console.log(data)
        /*
        const token = await firebase.auth().currentUser?.getIdToken(true)
        console.log(token)
        if (token) {
          localStorage.setItem('@token', token)
        }

        console.log(data.user)
        const id = data.user?.uid as string
        const name = data.user?.displayName as string

        await apiClient.user.$post({ body: { id, name } })
        */
      })
      .catch((err) => {
        console.log(err)
      })
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

  /*
  const createTask = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!label) return

      await apiClient.tasks.post({ body: { label } })
      setLabel('')
      revalidate()
    },
    [label]
  )

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
        <UserBanner />

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>frourio-todo-app</p>

        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </main>
    </div>
  )
}

export default Home
