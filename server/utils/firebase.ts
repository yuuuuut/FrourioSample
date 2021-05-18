import firebase from 'firebase-admin'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const credentials = require('../credentials.json')

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  storageBucket: 'frouriotest.appspot.com'
})

export default firebase
