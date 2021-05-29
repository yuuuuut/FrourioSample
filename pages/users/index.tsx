import { ChangeEvent, useCallback, useState } from 'react'

import { apiClient } from '~/utils/apiClient'
import { UserShow } from '~/server/types'

const IndexUser = () => {
  /*
  const [page, setPgae] = useState(1)
  const { data, error, revalidate } = useAspidaSWR(apiClient.user, {
    query: { page }
  })
  console.log(data?.users)

  if (error) return <div>failed to load</div>
  if (!data?.users) return <div>loading...</div>
  */

  const [id, setId] = useState('')
  const [userShow, setUserShow] = useState<UserShow | null>()
  const [isFollow, setIsFollow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
      setIsFollow(false)

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
      setIsFollow(res.body.isFollow)
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

  const follow = async (userId: string) => {
    try {
      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const resUser = await apiClient.user
        ._userId(userId)
        .relationships.post({ headers: { authorization: token } })

      setIsFollow(true)
      console.log(resUser)
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

      <div className="grid grid-cols-8 sm:grid-cols-6 gap-4">
        {errorMessage && (
          <div className="col-start-1 col-span-8 sm:col-start-2 sm:col-span-4 mt-5">
            <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto w-3/4 xl:w-2/4">
              <span className="text-red-800">
                {' '}
                ユーザーが見つかりませんでした。IDを確認してください。{' '}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          {userShow && (
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:py-4  sm:items-center sm:space-y-0 md:grid-cols-5 md:space-x-6 gap-1  mt-5 py-8 px-8  bg-white rounded-xl shadow-xl space-y-2">
              <div className="mx-auto col-start-1 sm:col-start-2 md:col-start-1 md:col-span-1">
                <img className="h-24 rounded-full" src={userShow.photoUrl} />
              </div>
              <div className="mx-auto col-start-1 sm:col-start-2 md:col-start-2 md:col-span-2">
                <p className="text-2xl">{userShow.displayName}</p>
              </div>
              <div className="mx-auto col-start-1 sm:col-start-2 md:col-start-4 md:col-span-2">
                {isFollow ? (
                  <button
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 disabled:opacity-60"
                    disabled
                  >
                    申請済み
                  </button>
                ) : (
                  <button
                    onClick={() => follow(userShow.id)}
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    友達申請
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default IndexUser
