import { UserShow } from '~/server/types'

// Default Icon Image URL
const defaultIconImageURL = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_STORAGEBUCKET}/o/default-icon.png?alt=media&token=${process.env.NEXT_PUBLIC_DEFAULT_ICON_TOKEN}`

/**
 * Types
 */
type Props = {
  user: UserShow
  types:
    | {
        type: 'REQUEST'
        isRequest: boolean
        requestCreate: (userId: string) => Promise<void>
      }
    | {
        type: 'PERMIT'
        updateRequest: (userId: string) => Promise<void>
      }
}

/**
 * Main
 */
const UserCard = (props: Props) => {
  const { user, types } = props

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          {user && (
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:py-4  sm:items-center sm:space-y-0 md:grid-cols-5 md:space-x-6 gap-1  mt-5 py-8 px-8  bg-white rounded-xl shadow-xl space-y-2">
              <div className="mx-auto col-start-1 sm:col-start-2 md:col-start-1 md:col-span-1">
                {user.photoUrl !== '' ? (
                  <img className="h-24 rounded-full" src={user.photoUrl} />
                ) : (
                  <img
                    className="h-24 rounded-full"
                    src={defaultIconImageURL}
                  />
                )}
              </div>
              <div className="mx-auto col-start-1 sm:col-start-2 md:col-start-2 md:col-span-2">
                <p className="text-2xl">{user.displayName}</p>
              </div>
              <div className="mx-auto col-start-1 sm:col-start-2 md:col-start-4 md:col-span-2">
                {types.type === 'PERMIT' && (
                  <button
                    onClick={() => types.updateRequest(user.id)}
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    友達になる
                  </button>
                )}
                {types.type === 'REQUEST' &&
                  (types.isRequest ? (
                    <button
                      className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 disabled:opacity-50"
                      disabled
                    >
                      申請済み
                    </button>
                  ) : (
                    <button
                      onClick={() => types.requestCreate(user.id)}
                      className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                      友達申請
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserCard
