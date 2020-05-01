import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import axios from 'axios';
import styled from 'styled-components';
import firebase from './firebase';
// import { v4 as uuidv4 } from 'uuid';

import { GlobalStyle } from './GlobalStyle';
import Submit from './pages/Submit';
import Home from './pages/Home';
import Comments from './pages/Comments';
import { PostContext } from './PostContext';
import { SORT_OPTIONS } from './utils';
import Nav from './layouts/Nav';
import Modal from './components/Modal';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

export const Container = styled.div`
	width: 100%;
	min-height: 100vh;
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

function App() {
	const [user, setUser] = useState({});
	const [redditData, setRedditData] = useState([]);
	const [modalContent, setModalContent] = useState(null);
	const [posts, setPosts] = useState([]);
	//this is literally only here to trigger a rerender to
	//correctly display sorted posts
	const [updatePosts, setUpdatePosts] = useState();
	const [sortBy, setSortBy] = useState('TIME_ASC');
	//adding this to fetch the needed post comments when clicked
	const [postData, setPostData] = useState();

	//get list of posts from firebase for front page
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

	//detect user
	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			window.user = user;
			if (user) {
				firebase
					.firestore()
					.collection('users')
					.doc(window.user.uid)
					.get()
					.then((res) => {
						const data = res.data();
						setUser({
							username: user.displayName,
							email: user.email,
							uid: user.uid,
							isSignedIn: true,
							isAnonymous: false,
							posts: data.posts,
							votes: data.votes,
						});
					});
			} else {
				//  If no user, sign in anonymously with firebase.auth().signInAnonymously()
				//maybe
			}
		});
	}, []);

	//get comments from selected post and
	const viewPostComments = (id) => {
		console.log('running post comments func');
		firebase
			.firestore()
			.collection('posts')
			.doc(id)
			.get()
			.then((content) => {
				setPostData(content.data());
			})
			.catch((err) => console.log('Error getting post data', err));
	};

	const sortPosts = (sortBy) => {
		setSortBy(sortBy);
		setUpdatePosts(Date.now());
	};

	const displayModal = () => {
		if (modalContent === 'login') {
			return (
				<Modal closeModal={() => setModalContent(null)}>
					<LogIn
						showSignUp={() => setModalContent('signup')}
						closeModal={() => setModalContent(null)}
					/>
				</Modal>
			);
		} else if (modalContent === 'signup') {
			return (
				<Modal closeModal={() => setModalContent(null)}>
					<SignUp
						showLogIn={() => setModalContent('login')}
						closeModal={() => setModalContent(null)}
					/>
				</Modal>
			);
		} else {
			return null;
		}
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
				{displayModal()}
				<Nav openModal={setModalContent} closeModal={setModalContent} />
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
								viewPostComments={viewPostComments}
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
					<Route
						exact
						path="/comments/:post/:id"
						component={(props) => (
							<Comments
								{...props}
								setModalContent={setModalContent}
								postData={postData}
								viewPostComments={viewPostComments}
							/>
						)}
					/>
				</Switch>
			</Router>
		</PostContext.Provider>
	);
}

export default App;
