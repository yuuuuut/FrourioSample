import { useEffect, useState } from 'react'

import { atom, useRecoilState } from 'recoil'
import firebase from '~/utils/firebase'

export interface User {
  id: string
  displayName: string
  photoUrl: string
}

const userState = atom<User | null>({
  key: 'user',
  default: null
})

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    if (user !== null) {
      console.log('OK')
      return
    }

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          displayName: firebaseUser.displayName!,
          photoUrl: firebaseUser.photoURL!
        })
      } else {
        setUser(null)
      }
    })
    setUserLoading(false)
  }, [])

  return { user, setUser, userLoading }
}
