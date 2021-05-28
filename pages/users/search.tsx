import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { UserShow } from '~/server/types'
import { apiClient } from '~/utils/apiClient'

const SearchUser = () => {
  const [id, setId] = useState('')
  const [userShow, setUserShow] = useState<UserShow | null>()
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

      const token = localStorage.getItem('@token')

      if (!token) {
        console.error('Tokenが存在しません。')
        return
      }

      const resUser = await apiClient.user
        ._userId(id)
        .get({ query: { type: 'search' }, headers: { authorization: token } })

      console.log(resUser)

      setUserShow(resUser.body.user)
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

  return (
    <div>
      <div className="flex space-x-1">
        <div className="relative">
          <input
            type="text"
            value={id}
            onChange={inputId}
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="ユーザーID"
          />
        </div>

        <button
          onClick={() => getUser(id)}
          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          type="submit"
        >
          検索
        </button>
        <>{errorMessage !== '' && <p>{errorMessage}</p>}</>
      </div>
      <div>
        {userShow && (
          <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img
              className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
              src={userShow.photoUrl}
            />
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  {userShow.displayName}
                </p>
              </div>
              <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                友達申請を送る
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchUser
