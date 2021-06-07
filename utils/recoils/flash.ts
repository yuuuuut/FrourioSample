import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

/**
 * Atom
 */
const flashState = atom({
  key: 'flash',
  default: false
})

const flashMessageState = atom({
  key: 'flash-message',
  default: ''
})

/**
 * Main
 */
export function useFlash() {
  // state
  const [flash, setFlash] = useRecoilState(flashState)
  const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState)

  /**
   *
   */
  useEffect(() => {
    if (!flash) return

    setTimeout(() => {
      setFlash(false)
      setFlashMessage('')
    }, 4000)
  }, [])

  return { flash, setFlash, flashMessage, setFlashMessage }
}
