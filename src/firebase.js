import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBa7AHjUtlq9nXoHJl6VYyA6B__Z0iiawU',
	authDomain: 'front-page-of-the-front-page.firebaseapp.com',
	databaseURL: 'https://front-page-of-the-front-page.firebaseio.com',
	projectId: 'front-page-of-the-front-page',
	storageBucket: 'front-page-of-the-front-page.appspot.com',
	messagingSenderId: '739647364485',
	appId: '1:739647364485:web:f9ae2fb071cb9faafd38ec',
	measurementId: 'G-JBZ3EG1M29',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const createUserAccount = async (username, email, password, setUser) => {
	//create user, sign in and get uid
	const createAndGetUser = async () => {
		try {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.catch((err) => console.log(err.code, err.message));
			await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.catch((err) => console.log(err.code, err.message));
		} catch (err) {
			console.log(err);
		}
		return firebase.auth().currentUser;
	};

	// update display name - will completed remove this later
	const userInfo = await createAndGetUser();
	await userInfo
		.updateProfile({
			displayName: username,
		})
		.catch((err) => console.log(err));

	//create user doc in firebase and update state object
	await firebase
		.firestore()
		.collection('users')
		.doc(window.user.uid)
		.set({
			username,
			uid: window.user.uid,
			email,
			posts: [],
			postVotes: {},
			commentVotes: {},
		})
		.then(() => {
			setUser({
				email: window.user.email,
				username,
				uid: window.user.uid,
				isSignedIn: true,
				isAnonymous: false,
				posts: [],
				postVotes: {},
				commentVotes: {},
			});
		})
		.catch((err) => console.log(err));

	//store username
	firebase
		.firestore()
		.collection('usernames')
		.doc(username)
		.set({
			username,
		})
		.catch((err) => console.log(err));
};

//login, save userObj to state
export const logInExistingUser = async (email, password, setUser, user) => {
	let data;
	await firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.catch((err) => console.log(err.code, err.message));
	await firebase
		.firestore()
		.collection('users')
		.doc(window.user.uid)
		.get()
		.then((res) => {
			data = res.data();
		});
	await setUser({
		email,
		uid: data.uid,
		username: data.username,
		isSignedIn: true,
		isAnonymous: false,
		postVotes: data.postVotes,
		commentVotes: data.commentVotes,
		posts: data.posts,
	});
};

export const LINKPREVIEW_API_KEY = '9e9b0ecbf81675d816ae8481e5c3a3e9';
