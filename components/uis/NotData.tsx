import { ExclamationCircleIcon, EmojiSadIcon } from '@heroicons/react/outline'

/**
 * Styles
 */
const iconClassNames = 'h-20 w-20 text-gray-400'

/**
 * Types
 */
type Props = {
  describe: string
  iconKind: {
    name: 'ExclamationCircleIcon' | 'EmojiSadIcon' | 'NotIcon'
  }
}

/**
 * Main
 */
export default function NotData(props: Props) {
  const { describe, iconKind } = props

  return (
    <div className="grid grid-cols-1 gap-4">
      {iconKind.name !== 'NotIcon' && (
        <>
          <div className="mx-auto mt-10 col-start-1" />
          <div className="mx-auto col-start-1">
            {iconKind.name === 'ExclamationCircleIcon' && (
              <ExclamationCircleIcon className={iconClassNames} />
            )}
            {iconKind.name === 'EmojiSadIcon' && (
              <EmojiSadIcon className={iconClassNames} />
            )}
          </div>
        </>
      )}
      <div className="mx-auto col-start-1">
        <p className="font-bold mr-4 ml-4 text-xl text-gray-400">{describe}</p>
      </div>
    </div>
  )
}
