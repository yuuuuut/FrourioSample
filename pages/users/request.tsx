import { useEffect } from 'react'
import { apiClient } from '~/utils/apiClient'

const UserRequest = () => {
  const getFollowers = async () => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId('siKgxnMy0YgQc6Gk7leRYnAU7xc2')
        .relationships.get({ headers: { authorization: token } })

      console.log(res)
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    getFollowers()
  }, [])

  return (
    <>
      <div>User Request</div>
    </>
  )
}

export default UserRequest
