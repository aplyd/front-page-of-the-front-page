import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import firebase from './firebase';

import Nav from './layouts/Nav';
import FeedContainer from './layouts/FeedContainer';
import CreatePost from './components/CreatePost';
import { GlobalStyle } from './GlobalStyle';
import Submit from './pages/Submit';
import Home from './pages/Home';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	background: ${(props) => props.theme.colors.backgroundBlue};
`;

//TODO - get official reddit api?
//TODO - if you dont have a reddit account, you can comment and it will create an account w username and pass
//https://www.reddit.com/r/redditdev/comments/34t0df/creating_account_through_api/

function App() {
	const [redditData, setRedditData] = useState([]);
	const [posts, setPosts] = useState([]);
	const [updatePosts, setUpdatePosts] = useState();

	useEffect(() => {
		const newPosts = [];
		const subscribe = () => {
			firebase
				.firestore()
				.collection('posts')
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
	}, [updatePosts]);

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

	return (
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
						/>
					)}
				/>
				<Route
					exact
					path="/submit"
					component={(props) => (
						<Submit {...props} setUpdatePosts={setUpdatePosts} />
					)}
				/>
			</Switch>
		</Router>
	);
}

export default App;
