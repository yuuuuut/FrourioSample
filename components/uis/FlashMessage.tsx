/**
 * Types
 */
type Props = {
  flashMessage: string
}

export default function FlashMessage(props: Props) {
  const { flashMessage } = props

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">{flashMessage}</strong>
    </div>
  )
}
