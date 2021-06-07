import Head from 'next/head'

import TodoCreateButton from '~/components/todos/TodoCreateButton'
import FlashMessage from '~/components/uis/FlashMessage'

import { useAuthentication } from '~/utils/recoils/authentication'
import { useFlash } from '~/utils/recoils/flash'

/**
 * Main
 */
const Home = () => {
  const { user } = useAuthentication()
  const { flash, flashMessage } = useFlash()

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
          {flash && <FlashMessage flashMessage={flashMessage} />}
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
