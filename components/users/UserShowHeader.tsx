/**
 * Types
 */
type Props = {
  displayName: string
  photoUrl: string
}

/**
 * Main
 */
const UserShowHeader = (props: Props) => {
  const { displayName, photoUrl } = props

  return (
    <div className="grid grid-cols-1 gap-4">
      <img
        className="inline-block h-37 w-37 rounded-full ring-2 ring-white"
        src={photoUrl}
        alt=""
      />
      <div className="grid-start-1 mx-auto">
        <p className="text-2xl">{displayName}</p>
      </div>
    </div>
  )
}

export default UserShowHeader
