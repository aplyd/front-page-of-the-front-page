import React, { useState, useContext } from 'react';
import { Container } from '../App';
import Nav from '../layouts/Nav';
import FeedContainer from '../layouts/FeedContainer';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import { PostContext } from '../PostContext';

export default function Home({ redditData, posts, sortPosts, sortBy }) {
	const [modalContent, setModalContent] = useState(null);
	const { user } = useContext(PostContext);

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
		<Container>
			{displayModal()}
			<Nav openModal={setModalContent} closeModal={setModalContent} />

			<FeedContainer
				redditData={redditData}
				posts={posts}
				sortPosts={sortPosts}
				sortBy={sortBy}
			></FeedContainer>
		</Container>
	);
}
