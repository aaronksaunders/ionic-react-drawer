import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyDs7PUvcA8tjZqYZyKNIzx2Z8okBYsBM_o",
    authDomain: "in3grow-app.firebaseapp.com",
    databaseURL: "https://in3grow-app.firebaseio.com",
    projectId: "in3grow-app",
    storageBucket: "in3grow-app.appspot.com",
    messagingSenderId: "212863563912"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}


}

export default new Firebase()