import React, { useState } from 'react';
import { Container } from '../App';
import Nav from '../layouts/Nav';
import FeedContainer from '../layouts/FeedContainer';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import LogIn from '../components/SignUp';
import SignUp from '../components/LogIn';

export default function Home({ redditData, posts, sortPosts, sortBy }) {
	const [modalContent, setModalContent] = useState('login');

	const showLogIn = () => console.log('log');

	const displayModal = () => {
		if (modalContent === 'login') {
			return (
				<Modal closeModal={() => setModalContent(null)}>
					<LogIn />
				</Modal>
			);
		} else if (modalContent === 'signup') {
			return (
				<Modal
					closeModal={() => setModalContent(null)}
					showLogIn={showLogIn}
				>
					<SignUp showLogIn={showLogIn} />
				</Modal>
			);
		} else {
			return null;
		}
	};

	return (
		<Container>
			{displayModal()}
			<Nav openModal={setModalContent} />
			<button>
				<Link to="/submit">Create Post</Link>
			</button>
			<FeedContainer
				redditData={redditData}
				posts={posts}
				sortPosts={sortPosts}
				sortBy={sortBy}
			></FeedContainer>
		</Container>
	);
}