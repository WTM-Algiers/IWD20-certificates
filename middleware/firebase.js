import firebase from 'firebase/app'
import 'firebase/storage'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyC860NMsFo8MdjtquVGS7gWCTAgrTYjiUI',
  authDomain: 'iwd-certificates.firebaseapp.com',
  databaseURL: 'https://iwd-certificates.firebaseio.com',
  projectId: 'iwd-certificates',
  storageBucket: 'iwd-certificates.appspot.com',
  messagingSenderId: '223690651111',
  appId: '1:223690651111:web:3494b7b822337fd69d7942',
  measurementId: 'G-JS541QYR43'
}
firebase.initializeApp(config)
