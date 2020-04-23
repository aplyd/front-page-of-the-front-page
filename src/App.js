import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import axios from 'axios';
import styled from 'styled-components';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';

import { GlobalStyle } from './GlobalStyle';
import Submit from './pages/Submit';
import Home from './pages/Home';
import { PostContext } from './PostContext';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	background: ${(props) => props.theme.colors.backgroundBlue};
`;

//TODO - get official reddit api?
//TODO - if you dont have a reddit account, you can comment anon (CREATE ANON ABILITY)
//https://www.reddit.com/r/redditdev/comments/34t0df/creating_account_through_api/

//	NO SUBREDDITS - ONLY FRONT PAGE
//	ANON COMMENT, POST ABILITY
//	LATER - USER ACCOUNTS
// 	PAGES - HOME, SUBMIT, VIEWPOSTS

// if user doesn't exist, create user
// useEffect(() => {
// 	if (!localStorage.getItem('tempUser') && !firebase.auth().currentUser) {
// 		firebase
// 			.auth()
// 			.signInAnonymously()
// 			.then(() => {
// 				localStorage.setItem(
// 					'tempUser',
// 					JSON.stringify(firebase.auth().currentUser)
// 				);
// 			})
// 			.catch((error) => {
// 				console.log(error.code);
// 				console.log(error.message);
// 			});
// 	} else {
// 		//do something
// 	}
// }, []);

const loadRedditData = () => {
	// firebase.firestore().collection('posts').add({
	// 	title: 'hahaha',
	// 	userID: 'fdsafdsafas',
	// 	vote: 34,
	// });
	// useEffect(() => {
	// 	axios
	// 		.get('https://www.reddit.com/.json')
	// 		.then((res) => setRedditData(res.data.data.children))
	// 		.catch((err) => console.log(err));
	// }, []);
};

// firebase.auth().onAuthStateChanged((user) => {
// 	if (user.isAnonymous) {
// 		setUser({
// 			id: user.uid,
// 			isAnonymous: true,
// 		});
// 	} else {
// 		console.log(user);
// 	}
// });

const SORT_OPTIONS = {
	TIME_ASC: { column: 'timestamp', direction: 'asc' },
	TIME_DESC: { column: 'timestamp', direction: 'desc' },
	VOTE_ASC: { column: 'vote', direction: 'asc' },
};

// const user_state_object = {
// 	username,
// 	email,
// 	password,
// 	id,
// 	isSignedIn: true,
// 	isAnonymous: false,
// 	votes: [],
// }

function App() {
	const [user, setUser] = useState({});
	const [redditData, setRedditData] = useState([]);
	const [posts, setPosts] = useState([]);
	const [updatePosts, setUpdatePosts] = useState();
	const [sortBy, setSortBy] = useState('TIME_ASC');

	//get posts from firebase
	useEffect(() => {
		const newPosts = [];
		const subscribe = () => {
			firebase
				.firestore()
				.collection('posts')
				.orderBy(
					SORT_OPTIONS[sortBy].column,
					SORT_OPTIONS[sortBy].direction
				)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						newPosts.unshift({ id: doc.id, ...doc.data() });
					});
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setPosts(newPosts);
				});
		};
		subscribe();
		return () => subscribe();
	}, [sortBy, updatePosts]);

	useEffect(() => {}, [user]);

	//validate on frontend first to see if username/email available?
	//create, login, update username, save userObj
	const createUserAccount = async (username, email, password) => {
		//create and log in
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

		//update display name and add to user object
		const userInfo = await createAndGetUser();
		await userInfo
			.updateProfile({
				displayName: username,
			})
			.then(() => {
				setUser({
					email,
					password,
					username,
					uid: userInfo.uid,
					isSignedIn: true,
					isAnonymous: false,
					votes: [],
				});
			})
			.catch((err) => console.log(err));

		await firebase
			.firestore()
			.collection('users')
			.add({
				username,
				uid: userInfo.uid,
				posts: [],
				votes: [],
			})
			.catch((err) => console.log(err));
	};

	//login, save userObj
	const logInExistingUser = (email, password) => {
		let userInfo;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				userInfo = firebase.auth().currentUser;
			})
			.catch((err) => console.log(err.code, err.message))
			.finally(() => {
				setUser({
					email,
					password,
					username: userInfo.displayName,
					isSignedIn: true,
					isAnonymous: false,
					votes: [],
				});
			});
	};

	const updateLoggedInUser = async () => {};

	const sortPosts = (sortBy) => {
		setSortBy(sortBy);
		setUpdatePosts(Date.now());
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				user,
				setUser,
				setUpdatePosts,
				createUserAccount,
				logInExistingUser,
			}}
		>
			<Router>
				<GlobalStyle />
				<Switch>
					<Route
						exact
						path="/"
						component={(props) => (
							<Home
								{...props}
								loadRedditData={loadRedditData}
								posts={posts}
								redditData={redditData}
								sortPosts={sortPosts}
								sortBy={sortBy}
							/>
						)}
					/>
					<Route
						exact
						path="/submit"
						component={(props) => (
							<Submit
								{...props}
								setUpdatePosts={setUpdatePosts}
							/>
						)}
					/>
				</Switch>
			</Router>
		</PostContext.Provider>
	);
}

export default App;
