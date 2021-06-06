import { useEffect, useState } from 'react'
import Head from 'next/head'

import FlashMessage from '~/components/uis/FlashMessage'

const Home = () => {
  const [flashMessage, setFlashMessage] = useState('')

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
      </main>
    </div>
  )
}

export default Home
