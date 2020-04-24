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

function App() {
	const [user, setUser] = useState({});
	const [redditData, setRedditData] = useState([]);
	const [posts, setPosts] = useState([]);
	const [updatePosts, setUpdatePosts] = useState();
	const [sortBy, setSortBy] = useState('TIME_ASC');

	useEffect(() => {
		//get posts from firebase
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

	//store logged in user in state or create anonymous user
	useEffect(() => {
		const userInfo = window.user;
		console.log(userInfo);
		if (userInfo) {
			setUser({
				username: userInfo.displayName,
				email: userInfo.email,
				uid: userInfo.uid,
				isSignedIn: true,
				isAnonymous: false,
			});
		} else {
			//handle anonymous sign in later
		}
	}, []);

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
