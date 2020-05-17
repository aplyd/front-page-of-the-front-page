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
import notFound404 from './pages/NotFound404';

export const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	background: ${(props) => props.theme.colors.backgroundBlue};
	padding-top: 48px;
`;

function App() {
	const [user, setUser] = useState({});
	const [modalContent, setModalContent] = useState(null);
	const [posts, setPosts] = useState([]);
	//this (setUpdatePosts) is literally only here to trigger a rerender to
	//correctly display sorted posts - will probably remove when refactored correctly
	//anti-pattern
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
	//should remove updatePosts from dep array

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
							username: window.user.displayName,
							email: user.email,
							uid: user.uid,
							isSignedIn: true,
							isAnonymous: false,
							posts: data.posts ? data.posts : [],
							votes: data.votes ? data.votes : {},
						});
					})
					.catch((err) => console.log(err));
			}
		});
	}, []);

	//get comments from selected post and
	const viewPostComments = (id) => {
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

	const castPostVote = (
		event,
		direction,
		id,
		vote,
		setUserVote,
		homeOrCommentsFlag
	) => {
		event.stopPropagation();
		let newVoteCount;

		if (user.isSignedIn) {
			if (user.votes[id] === direction) {
				//do nothing - this block is to filter out double votes
			} else {
				if (user.votes[id] === 'up') {
					//this block is to vote down after previously voting up
					newVoteCount = vote - 2;
				} else if (user.votes[id] === 'down') {
					//this block is to vote up after previously voting down
					newVoteCount = vote + 2;
				} else {
					//this block gets the direction for first vote
					direction === 'up'
						? (newVoteCount = vote + 1)
						: (newVoteCount = vote - 1);
				}

				// the reason for the homeOrCommentsFlag argument is because different
				// state needs to be updated depending on where castPostVote is called from
				if (homeOrCommentsFlag === 'home') {
					const updatedPosts = posts.map((post) => {
						if (post.id === id) {
							post.vote = newVoteCount;
						}
						return post;
					});
					setPosts(updatedPosts);
				} else if (homeOrCommentsFlag === 'comments') {
					const updatedPostData = { ...postData };
					updatedPostData.vote = newVoteCount;
					setPostData(updatedPostData);
				}

				const newUserVotes = { ...user.votes };
				newUserVotes[id] = direction;

				setUserVote(direction);
				setUser({ ...user, votes: newUserVotes });

				firebase
					.firestore()
					.collection('users')
					.doc(user.uid)
					.update({
						votes: newUserVotes,
					})
					// .then(() => {})
					.catch((err) => console.log(err));

				//add vote to post document in firebase
				//using date.now with setUpdatePosts to trigger re-render - definitely antipattern will fix later
				firebase
					.firestore()
					.collection('posts')
					.doc(id)
					.update({
						vote: newVoteCount,
					})
					.then(() => {
						// setUpdatePosts(Date.now())
					})
					.catch((err) => console.log(err));
			}
		} else {
			//user is not signed in
			setModalContent('signup');
		}
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
				setModalContent,
				castPostVote,
			}}
		>
			<Router>
				<GlobalStyle />
				{displayModal()}
				<Nav
					openModal={setModalContent}
					closeModal={setModalContent}
					viewPostComments={viewPostComments}
				/>
				<Switch>
					<Route
						exact
						path="/"
						component={(props) => (
							<Home
								{...props}
								posts={posts}
								sortPosts={sortPosts}
								sortBy={sortBy}
								viewPostComments={viewPostComments}
								user={user}
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
					<Route component={notFound404} />
				</Switch>
			</Router>
		</PostContext.Provider>
	);
}

export default App;
