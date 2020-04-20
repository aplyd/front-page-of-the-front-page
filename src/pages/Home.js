import React from 'react';
import { Container } from '../App';
import Nav from '../layouts/Nav';
import FeedContainer from '../layouts/FeedContainer';
import { Link } from 'react-router-dom';

export default function Home({ redditData, loadRedditData, posts, sortPosts }) {
	return (
		<Container>
			<Nav loadRedditData={loadRedditData} />
			<button>
				<Link to="/submit">Create Post</Link>
			</button>
			<FeedContainer
				redditData={redditData}
				posts={posts}
				sortPosts={sortPosts}
			></FeedContainer>
		</Container>
	);
}
