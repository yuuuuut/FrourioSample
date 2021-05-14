import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export default firebase
