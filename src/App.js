import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import firebase from './firebase';

import Nav from './layouts/Nav';
import FeedContainer from './layouts/FeedContainer';

const Container = styled.div`
	width: 100%;
	height: 100%;
	background: #dae0e6;
`;

//TODO - get official reddit api?

const usePosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const newPosts = [];
		firebase
			.firestore()
			.collection('posts')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					newPosts.push({ id: doc.id, ...doc.data() });
				});
			})
			.catch((err) => console.log(err))
			.finally(() => setPosts(newPosts));
	}, []);
};

function App() {
	const [redditData, setRedditData] = useState();
	const posts = usePosts();
	console.log(posts);

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

	return (
		<React.Fragment>
			<Container>
				<Nav loadRedditData={loadRedditData} />
				<FeedContainer
					redditData={redditData}
					posts={posts}
				></FeedContainer>
			</Container>
		</React.Fragment>
	);
}

export default App;
