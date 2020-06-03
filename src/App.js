import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import firebase from './firebase';
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
	width: 100vw;
	min-height: 100vh;
	background: ${(props) => props.theme.colors.backgroundBlue};
	padding-top: 48px;
`;

function App() {
	const [user, setUser] = useState({});
	const [users, setUsers] = useState(null);
	const [modalContent, setModalContent] = useState(null);
	const [posts, setPosts] = useState([]);
	const [sortBy, setSortBy] = useState('TIME_ASC');
	//adding this to fetch the needed post comments when clicked
	const [postData, setPostData] = useState();
	const [postVotes, setPostVotes] = useState(null);

	//get list of posts from firebase
	useEffect(() => {
		const newPosts = [];
		let newPostVotes = [];
		const subscribe = () => {
			firebase
				.firestore()
				.collection('posts')
				.orderBy(
					SORT_OPTIONS[sortBy].column,
					SORT_OPTIONS[sortBy].direction
				)
				.orderBy(
					SORT_OPTIONS[sortBy].column2,
					SORT_OPTIONS[sortBy].direction2
				)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						const post = doc.data();
						newPostVotes.unshift({ vote: post.vote, id: post.id });
						newPosts.unshift({ id: doc.id, ...post });
					});
					setPostVotes(newPostVotes);
					setPosts(newPosts);
				})
				.catch((err) => console.log(err));
		};
		subscribe();
		return () => subscribe();
	}, [sortBy]);

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
							username: data.username,
							email: user.email,
							uid: user.uid,
							isSignedIn: true,
							isAnonymous: false,
							posts: data.posts,
							postVotes: data.postVotes,
							commentVotes: data.commentVotes,
						});
					})
					.catch((err) => console.log(err));
			}
		});
	}, []);

	const viewPostComments = (id) => {
		const post = posts.filter((post) => post.id === id);
		setPostData(post[0]);
	};

	const sortPosts = (sortBy) => {
		setSortBy(sortBy);
	};

	function castPostVote(
		event,
		direction,
		id,
		vote,
		setUserVote,
		homeOrCommentsFlag
	) {
		event.stopPropagation();

		if (user.isSignedIn) {
			let newVoteCount;

			if (user.postVotes[id] === direction) {
				//do nothing - this block is to filter out double votes
			} else {
				if (user.postVotes[id] === 'up') {
					//this block is to vote down after previously voting up
					newVoteCount = vote - 2;
				} else if (user.postVotes[id] === 'down') {
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
					// const updatedPosts = posts.map((post) => {
					// 	if (post.id === id) {
					// 		post.vote = newVoteCount;
					// 	}
					// 	return post;
					// });
					// setPosts(updatedPosts);
					const newPostVotes = postVotes.map((post) => {
						if (post.id === id) {
							post.vote = newVoteCount;
						}
					});
					setPostVotes(newPostVotes);
				} else if (homeOrCommentsFlag === 'comments') {
					const updatedPostData = { ...postData };
					updatedPostData.vote = newVoteCount;
					setPostData(updatedPostData);
				}

				const newUserVotes = { ...user.postVotes };
				newUserVotes[id] = direction;

				setUserVote(direction);
				setUser({ ...user, postVotes: newUserVotes });

				firebase
					.firestore()
					.collection('users')
					.doc(user.uid)
					.update({ postVotes: newUserVotes })
					.catch((err) => console.log(err));

				firebase
					.firestore()
					.collection('posts')
					.doc(id)
					.update({ vote: newVoteCount })
					.catch((err) => console.log(err));
			}
		} else {
			//user is not signed in
			setModalContent('signup');
		}
	}

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
				setPosts,
				user,
				setUser,
				users,
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
								postVotes={postVotes}
							/>
						)}
					/>
					<Route
						exact
						path="/submit"
						component={(props) => <Submit {...props} />}
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
								setPostData={setPostData}
								setUser={setUser}
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
