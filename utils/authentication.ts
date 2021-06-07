import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

import { atom, useRecoilState } from 'recoil'

import { apiClient } from './apiClient'

import firebase from '~/utils/firebase'

/**
 * Types
 */
export interface User {
  id: string
  displayName: string
  photoUrl: string
}

/**
 * Atom
 */
const userState = atom<User | null>({
  key: 'user',
  default: null
})

/**
 * Main
 */
export function useAuthentication() {
  // router
  const router = useRouter()

  // state
  const [user, setUser] = useRecoilState(userState)

  /**
   * Google Login
   */
  const login = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      const data = await firebase.auth().signInWithPopup(provider)
      const token = await firebase.auth().currentUser?.getIdToken(true)

      if (!token) return
      if (!data.user) return

      localStorage.setItem('@token', token)

      const body = {
        id: data.user.uid,
        displayName: data.user.displayName || '',
        photoUrl: data.user.photoURL || ''
      }

      const res = await apiClient.user.post({ body })
      console.log(res)

      setUser({
        id: res.body.user.id,
        displayName: res.body.user.displayName,
        photoUrl: res.body.user.photoUrl
      })

      router.push(`/users/${res.body.user.id}`)
    } catch (err) {
      console.log(err)
      setUser(null)
    }
  }, [])

  /**
   * GoogleAuth SignOut
   */
  const logout = useCallback(async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null)
        localStorage.removeItem('@token')
        router.push('/')
      })
  }, [])

  /**
   * Tokenを取得します。
   */
  const getToken = () => {
    const token = localStorage.getItem('@token')

    if (!token) throw Object.assign(new Error(), { response: { status: 401 } })

    return token
  }

  /**
   * Error Handling
   */
  const errorHandling = (err: any) => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          localStorage.setItem('flash', 'ログインが必要です。')
          logout()
          break
        case 403:
          localStorage.setItem('flash', '権限のないページです。')
          router.push('/')
          break
      }
    } else {
      console.log(err)
    }
  }

  /**
   *
   */
  useEffect(() => {
    if (user !== null) {
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
  }, [])

  return { user, login, logout, getToken, errorHandling }
}
