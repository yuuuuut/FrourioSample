import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { TodoShow } from '~/server/types'
import { apiClient } from '~/utils/apiClient'

const ShowTodo = () => {
  const router = useRouter()

  console.log(router.query)

  const [id, setId] = useState<string>()
  const [todoShow, setTodoShow] = useState({} as TodoShow)

  const getTodo = async (id: number) => {
    try {
      const res = await apiClient.todos._todoId(id).get()
      console.log(res)

      setTodoShow(res.body.todo)
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      console.log(router.query)
      const id = router.query.id as string
      setId(id)
    }
  }, [router])

  useEffect(() => {
    if (id) {
      const todoId = Number(id)
      getTodo(todoId)
    }
  }, [id])

  return (
    <div>
      {todoShow ? (
        <div>
          <h1>{todoShow.id}</h1>
          <p>{todoShow.title}</p>
          <p>{todoShow.due_date}</p>
        </div>
      ) : (
        <div>Not Todo</div>
      )}
    </div>
  )
}

export default ShowTodo
