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

const SORT_OPTIONS = {
	TIME_ASC: { column: 'timestamp', direction: 'asc' },
	TIME_DESC: { column: 'timestamp', direction: 'desc' },
	VOTE_ASC: { column: 'vote', direction: 'asc' },
};

function App() {
	const [user, setUser] = useState();
	const [redditData, setRedditData] = useState([]);
	const [posts, setPosts] = useState([]);
	const [updatePosts, setUpdatePosts] = useState();
	const [sortBy, setSortBy] = useState('TIME_ASC');

	// if user doesn't exist, create user
	// useEffect(() => {
	// 	const storeUser = () => {
	// 		// if (!localStorage.getItem('user')) {
	// 		// 	setUser(uuidv4());
	// 		// 	localStorage.setItem('user', user);
	// 		// }
	// 		firebase
	// 			.auth()
	// 			.createUserWithEmailAndPassword(userEmail, userPassword)
	// 			.catch(function (error) {
	// 				// Handle Errors here.
	// 				console.log(error.code);
	// 				console.log(error.message);
	// 				// ...
	// 			});
	// 		console.log('from app', userEmail, userPassword);
	// 	};

	// 	storeUser();
	// 	return () => storeUser();
	// }, [userEmail, userPassword]);

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
				.finally(() => setPosts(newPosts));
		};
		subscribe();
		return () => subscribe();
	}, [sortBy, updatePosts]);

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
		console.log('load');
	};

	const createUserAccount = (e, p) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(e, p)
			.catch(function (error) {
				console.log(error.code);
				console.log(error.message);
			});
	};

	const sortPosts = (sortBy) => {
		setSortBy(sortBy);
		setUpdatePosts(Date.now());
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				user,
				setUpdatePosts,
				createUserAccount,
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
