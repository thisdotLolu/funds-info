import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCnYuPeY9GBKEfTVWJXGM10xvCbfNy36nE",
    authDomain: "funds-info.firebaseapp.com",
    projectId: "funds-info",
    storageBucket: "funds-info.appspot.com",
    messagingSenderId: "982051799134",
    appId: "1:982051799134:web:bd83e7fdd1ea9edad274cf"
};


firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()


export { projectFirestore, projectAuth }   