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
    <div>
      <img
        className="inline-block h-37 w-37 rounded-full ring-2 ring-white"
        src={photoUrl}
        alt=""
      />
      <div className="my-3 text-3xl">{displayName}</div>
    </div>
  )
}

export default UserShowHeader
