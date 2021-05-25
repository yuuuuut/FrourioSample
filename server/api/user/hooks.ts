import firebase from '$/utils/firebase'

import { defineHooks } from './$relay'

export type AdditionalRequest = {
  currentUserUid: string
}

export default defineHooks(() => ({
  onRequest: async (req, res, next) => {
    if (req.method === 'POST') {
      next()
      return
    }

    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Tokenが存在しません。' })
    }

    const token = req.headers.authorization

    try {
      const decoded = await firebase.auth().verifyIdToken(token)
      req.currentUserUid = decoded.uid

      next()
    } catch (err) {
      return res.status(403).json({ message: 'Tokenが不正です。' })
    }
  }
}))
