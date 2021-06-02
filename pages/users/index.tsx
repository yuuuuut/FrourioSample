import { ChangeEvent, useCallback, useState } from 'react'

import { apiClient } from '~/utils/apiClient'
import { UserShow } from '~/server/types'

import UserCard from '~/components/users/UserCard'
import NotData from '~/components/uis/NotData'

/**
 * Main
 */
const Index = () => {
  /*
  const [page, setPgae] = useState(1)
  const { data, error, revalidate } = useAspidaSWR(apiClient.user, {
    query: { page }
  })
  console.log(data?.users)

  if (error) return <div>failed to load</div>
  if (!data?.users) return <div>loading...</div>
  */

  // states
  const [id, setId] = useState('')
  const [isFriend, setIsFriend] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [userShow, setUserShow] = useState<UserShow | null>()

  /**
   * id input event
   */
  const inputId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setId(e.target.value),
    []
  )

  /**
   * Userを取得します。
   */
  const getUser = async (id: string) => {
    try {
      setErrorMessage('')
      setUserShow(null)
      setIsRequest(false)
      setIsFriend(false)

      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId(id)
        .get({ query: { type: 'search' }, headers: { authorization: token } })

      console.log(res)

      setUserShow(res.body.user)
      setIsFriend(res.body.isFollowing)
      setIsRequest(res.body.isRequestBool)
    } catch (err) {
      switch (err.response.status) {
        case 404:
          setErrorMessage('ユーザーが見つかりません。')
          break
        default:
          console.log(err.response)
          break
      }
    }
  }

  const requestCreate = async (userId: string) => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const res = await apiClient.user
        ._userId(userId)
        .requests.post({ headers: { authorization: token } })

      setIsRequest(true)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="mt-5 col-start-2 col-span-4 sm:col-start-2 sm:col-span-3 sm:mt-5 sm:col-start-2 sm:col-span-3">
          <input
            type="text"
            value={id}
            onChange={inputId}
            className="w-full rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="ユーザーID"
          />
        </div>
        <div className="col-start-2 col-span-4 sm:col-start-5 sm:col-span-1 sm:mt-5">
          <button
            onClick={() => getUser(id)}
            className={`w-full flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200`}
            disabled={!id}
            type="submit"
          >
            検索
          </button>
        </div>
      </div>

      {errorMessage && (
        <NotData
          describe={'ユーザーが存在しません。IDを確認してください。'}
          iconKind={{ name: 'EmojiSadIcon' }}
        />
      )}

      {userShow && (
        <UserCard
          user={userShow}
          types={{ type: 'REQUEST', isFriend, isRequest, requestCreate }}
        />
      )}
    </>
  )
}

export default Index
