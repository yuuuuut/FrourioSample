import { useEffect, useState } from 'react'
import Head from 'next/head'

import FlashMessage from '~/components/uis/FlashMessage'
import TodoCreateButton from '~/components/todos/TodoCreateButton'
import { useAuthentication } from '~/utils/authentication'

const Home = () => {
  const { user } = useAuthentication()

  const [flashMessage, setFlashMessage] = useState('')

  const flash = () => {
    const message = localStorage.getItem('flash')
    if (!message) return

    setFlashMessage(message)
    setTimeout(() => {
      setFlashMessage('')
    }, 5000)

    localStorage.removeItem('flash')
  }

  useEffect(() => {
    flash()
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
        {user && (
          <div className="absolute bottom-8 right-8">
            <TodoCreateButton />
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
