import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

import { apiClient } from '~/utils/apiClient'

/**
 * Main
 */
const Index = () => {
  // router
  const router = useRouter()

  /**
   * Relationshipの配列を取得します。
   */
  const getRelationships = async () => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const id = router.query.id as string

      const resUser = await apiClient.user
        ._userId(id)
        .relationships.get({ headers: { authorization: token } })

      console.log(resUser)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRelationships()
  }, [])

  return <div>A</div>
}

export default Index
