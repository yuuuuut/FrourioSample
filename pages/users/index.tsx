import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

import { apiClient } from '~/utils/apiClient'

const IndexUser = () => {
  const router = useRouter()

  const [page, setPgae] = useState(1)

  const { data, error, revalidate } = useAspidaSWR(apiClient.user, {
    query: { page }
  })
  console.log(data?.users)

  const addPage = () => {
    const addPageIndex = page + 1
    setPgae(addPageIndex)
    router.push(`users?page=${addPageIndex}`)
  }

  useEffect(() => {
    console.log('OK')
    if (router.asPath !== router.route) {
      const pageIndex = Number(router.query.page)
      pageIndex ? setPgae(pageIndex) : setPgae(1)
    } else {
      setPgae(1)
    }
  }, [router])

  if (error) return <div>failed to load</div>
  if (!data?.users) return <div>loading...</div>

  return (
    <>
      <div>User Index</div>
      <button onClick={addPage}>Add</button>
      {data.users.length ? (
        <div>
          {data.users.map((user) => (
            <div key={user.id}>
              <h2>{user.id}</h2>
            </div>
          ))}
        </div>
      ) : (
        <h1>None</h1>
      )}
    </>
  )
}

export default IndexUser
