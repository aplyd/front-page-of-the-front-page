import React, { useState } from 'react';
import { Container } from '../App';
import Nav from '../layouts/Nav';
import FeedContainer from '../layouts/FeedContainer';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

export default function Home({ redditData, posts, sortPosts, sortBy }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const logIn = () => {
		setIsModalOpen(true);
	};

	const signUp = () => {
		setIsModalOpen(true);
	};

	return (
		<Container>
			{isModalOpen ? (
				<Modal closeModal={() => setIsModalOpen(false)} />
			) : null}
			<Nav logIn={logIn} signUp={signUp} />
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
